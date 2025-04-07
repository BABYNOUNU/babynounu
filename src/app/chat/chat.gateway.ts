// src/chat/chat.gateway.ts

import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auh.guard';
import { RoomsService } from '../rooms/rooms.service';
import { MessageService } from '../messages/messages.service';
import { UserService } from '../user/user.service';
import { Room } from '../rooms/models/room.model';
import { User } from '../user/user.model';

/**
 * WebSocket Gateway pour gérer les fonctionnalités de chat en temps réel
 * Ce gateway gère les événements liés aux messages, aux rooms et aux notifications
 */
@WebSocketGateway({
  cors: {
    origin: '*', // Autorise toutes les origines (à restreindre en production)
  },
})
// @UseGuards(JwtAuthGuard) // Protection globale par JWT
export class ChatGateway {
  @WebSocketServer()
  server: Server; // Instance du serveur Socket.IO

  constructor(
    private readonly roomService: RoomsService,
    private readonly messageService: MessageService,
    private readonly userService: UserService,
  ) {}

  //#region Room Management

  /**
   * Gère l'événement de rejoindre une room
   * @param data Contient l'ID de la room à rejoindre
   * @param client Socket du client
   */
  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @MessageBody() data: { roomId: number },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(`room_${data.roomId}`);
  }

  //#endregion

  //#region Message Handling

  /**
   * Gère l'envoi d'un nouveau message
   * @param data Contient le contenu du message, l'ID de la room et le destinataire optionnel
   * @param client Socket du client avec les informations d'authentification
   */
  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() data: { roomId: number; content: string; toSender?: any },
    @ConnectedSocket() client: any,
  ) {
    const userClient = client.handshake.auth.user;
    const room = await this.roomService.findOne(data.roomId);

    // Création du message en base de données
    const message = await this.messageService.create({
      content: data.content,
      roomId: data.roomId,
      senderId: userClient.id,
    });

    // Mise à jour des compteurs de messages non lus selon le type de profil
    await this.updateUnreadCounters(userClient, room.id);

    // Diffusion du message à tous les participants de la room
    this.server.to(`room_${data.roomId}`).emit('newMessage', message);
    this.server.emit('updateConversationList');
    this.server.emit('requestRefreshUnreadCounts');

    // Gestion des notifications pour les différents types d'utilisateurs
    await this.handleUserNotifications(userClient, data, room);
  }

  /**
   * Met à jour les compteurs de messages non lus selon le type de profil
   * @param user Utilisateur qui envoie le message
   * @param roomId ID de la room concernée
   */
  private async updateUnreadCounters(user: any, roomId: number) {
    if (user.type_profil.slug === 'parent') {
      await this.roomService.incrementUnreadCount(roomId, 'nounu');
      await this.roomService.incrementUnreadCount(roomId, 'administrateur');
    } else if (user.type_profil.slug === 'nounu') {
      await this.roomService.incrementUnreadCount(roomId, 'parent');
    } else if (user.type_profil.slug === 'administrateur') {
      const room = await this.roomService.findOne(roomId);
      if (room.parent.user.id == user.id) {
        await this.roomService.incrementUnreadCount(roomId, 'nounu');
      } else {
        await this.roomService.incrementUnreadCount(roomId, 'parent');
      }
    }
  }

  /**
   * Gère les notifications pour les différents types d'utilisateurs
   * @param userClient Utilisateur qui envoie le message
   * @param messageData Données du message envoyé
   * @param room Room concernée
   */
  private async handleUserNotifications(
    userClient: any,
    messageData: { toSender?: any },
    room: Room,
  ) {
    if (userClient.type_profil.slug === 'parent') {
      // Notification pour les nounous
      this.userService.registerSocket(messageData.toSender, userClient.id);
      const nounuSocket = await this.userService.findSocket(
        messageData.toSender,
      );
      if (nounuSocket) {
        this.server.emit('updateConversationList');
        this.userService.removeSocket(messageData.toSender);
      }
      this.userService.removeSocket(messageData.toSender);
    } else if (userClient.type_profil.slug === 'administrateur') {
      // Notification pour les parents
      this.userService.registerSocket(room.parent.user.id, userClient.id);
      const parentSocket = await this.userService.findSocket(
        room.parent.user.id,
      );
      if (parentSocket) {
        this.server.to(parentSocket).emit('updateConversationList');
        this.userService.removeSocket(room.parent.user.id);
      }
      this.userService.removeSocket(room.parent.user.id);
    }
  }

  //#endregion

  //#region Conversation Management

  /**
   * Récupère toutes les conversations pour un utilisateur
   * @param client Socket du client
   */
  @SubscribeMessage('AllConversations')
  async getConversationsForUser(@ConnectedSocket() client: any) {
    const userClient = client.handshake.auth.user;
    const AllConversations = await this.roomService.getConversationsForUser(
      userClient.id,
    );
    this.server.emit('updateConversationList', AllConversations);
  }

  //#endregion

  //#region Unread Messages Management

  /**
   * Gère la demande de compteurs de messages non lus
   * @param client Socket du client
   */
  @SubscribeMessage('getGlobalUnreadCounts')
  async handleGetGlobalUnreadCounts(
    @MessageBody() data: { roomId: number },
    @ConnectedSocket() client: any,
  ) {
    const userClient = client.handshake.auth.user;
    const counts = await this.roomService.getGlobalUnreadCounts(
      data.roomId,
      userClient.id,
    );
    this.server.emit('globalUnreadCounts', counts);
    return counts;
  }

  /**
   * Marque les messages d'une room comme lus
   * @param data Contient l'ID de la room
   * @param client Socket du client
   */
  @SubscribeMessage('markAsRead')
  async handleMarkAsRead(
    @MessageBody() data: { roomId: number },
    @ConnectedSocket() client: any,
  ) {
    const userClient = client.handshake.auth.user;
    const room = await this.roomService.findOne(data.roomId);

    // Marquer les messages comme lus
    await this.messageService.markMessagesAsRead(room.id, userClient.id);

    // Réinitialiser le compteur selon le type de profil
    await this.resetUnreadCounter(userClient, room.id);

    // Notifier les autres participants
    this.server.to(`room_${data.roomId}`).emit('messagesRead', {
      roomId: room.id,
      readerId: userClient.id,
    });

    this.server.emit('requestRefreshUnreadCounts');
  }

  // Ajouter un handler
  @SubscribeMessage('requestRefreshUnreadCounts')
  async handleRequestRefreshUnreadCounts(
    @MessageBody() data: { roomId: number },
    @ConnectedSocket() client: any,
  ) {
    const userClient = client.handshake.auth.user;
    const counts = await this.roomService.getGlobalUnreadCounts(
      data.roomId,
      userClient.id,
    );
    this.server.emit('globalUnreadCounts', counts);
  }

  /**
   * Réinitialise le compteur de messages non lus selon le type de profil
   * @param user Utilisateur qui marque les messages comme lus
   * @param roomId ID de la room concernée
   */
  private async resetUnreadCounter(user: any, roomId: number) {
    if (user.type_profil.slug === 'parent') {
      await this.roomService.resetUnreadCount(roomId, 'parent');
    } else if (user.type_profil.slug === 'nounu') {
      await this.roomService.resetUnreadCount(roomId, 'nounu');
    } else if (user.type_profil.slug === 'administrateur') {
      await this.roomService.resetUnreadCount(roomId, 'administrateur');
    }
  }

  //#endregion

  //#region Typing Indicators

  /**
   * Gère l'indicateur de saisie (typing)
   * @param data Contient l'ID de la room et l'état de saisie
   * @param client Socket du client avec les informations utilisateur
   */
  @SubscribeMessage('typing')
  async handleTyping(
    @MessageBody() data: { roomId: number; isTyping: boolean },
    @ConnectedSocket() client: Socket & { user: User },
  ) {
    const userClient = client.handshake.auth.user;
    const room = await this.roomService.findOne(data.roomId);

    // Vérification des permissions
    if (!(await this.hasAccessToRoom(userClient.id, room))) {
      return;
    }

    // Diffusion de l'événement aux autres membres de la room
    client.broadcast.to(`room_${data.roomId}`).emit('userTyping', {
      userId: userClient.id,
      isTyping: data.isTyping,
    });
  }

  //#endregion

  //#region Helper Methods

  /**
   * Vérifie si un utilisateur a accès à une room
   * @param userId ID de l'utilisateur
   * @param room Room à vérifier
   * @returns Boolean indiquant si l'utilisateur a accès
   */
  private async hasAccessToRoom(userId: any, room: Room): Promise<boolean> {
    const user = await this.userService.findOne(userId);
    return (
      user.type_profil.slug === 'administrateur' ||
      (user.type_profil.slug === 'parent' && room.parent.user.id === user.id) ||
      (user.type_profil.slug === 'nounu' && room.nounou.user.id === user.id)
    );
  }

  //#endregion
}
