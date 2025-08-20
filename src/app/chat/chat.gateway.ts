import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsException
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomsService } from '../rooms/rooms.service';
import { AuthService } from '../auth/auth.service';
import { Logger, UseGuards, 
  OnModuleInit,
  OnModuleDestroy, } from '@nestjs/common';
import { WsJwtGuard } from '../auth/ws-auth.guard';
import { MessageService } from '../messages/messages.service';
import { AbonnementService } from '../abonnement/abonnement.service';
import { NotificationService } from '../notification/notification.service';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL || '*',
    credentials: true,
  },
  pingTimeout: 60000,
  pingInterval: 25000,
  maxHttpBufferSize: 1e6,
  connectTimeout: 45000,
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit, OnModuleDestroy {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(ChatGateway.name);
  private userConnections: Map<string, Set<Socket>> = new Map();
  private readonly connectionLock = new Map<string, Promise<void>>();
  private cleanupInterval: NodeJS.Timeout;
  private readonly MAX_CONNECTIONS_PER_USER = 5;

  constructor(
    private readonly roomService: RoomsService,
    private readonly authService: AuthService,
    private readonly messageService: MessageService,
    private readonly abonnementService: AbonnementService,
    private readonly notificationService: NotificationService,
  ) {}

  onModuleInit() {
    // Démarrer le nettoyage périodique
    this.cleanupInterval = setInterval(() => {
      this.cleanupStaleConnections();
      this.logMemoryUsage();
    }, 300000); // Toutes les 5 minutes
  }

  onModuleDestroy() {
    // Nettoyer l'intervalle à l'arrêt
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    
    // Nettoyer toutes les connexions
    this.cleanupAllConnections();
  }

  afterInit(server: Server) {
    server.sockets.setMaxListeners(50);
  }

  async handleConnection(client: Socket) {
    try {
      const userId = await this.authService.getUserFromSocket(client);
      if (!userId) {
        client.disconnect(true);
        return;
      }

      const lockKey = `connection_${userId.id}`;
      if (!this.connectionLock.has(lockKey)) {
        const connectionPromise = this.handleUserConnection(userId.id, client)
          .finally(() => {
            this.connectionLock.delete(lockKey);
          });
        
        this.connectionLock.set(lockKey, connectionPromise);
      }

      await this.connectionLock.get(lockKey);
    } catch (error) {
      this.logger.error(`HandleConnection error: ${error.message}`);
      client.disconnect(true);
    }
  }

  private async handleUserConnection(userId: string, client: Socket) {
    try {
      // Vérifier et limiter le nombre de connexions
      const currentConnections = this.userConnections.get(userId) || new Set();
      
      if (currentConnections.size >= this.MAX_CONNECTIONS_PER_USER) {
        // Déconnecter la connexion la plus ancienne
        const oldestSocket = Array.from(currentConnections)[0];
        this.cleanupSocket(oldestSocket, 'Too many connections');
      }

      // Configurer les écouteurs de la socket
      this.setupSocketListeners(client);

      // Ajouter la nouvelle connexion
      currentConnections.add(client);
      this.userConnections.set(userId, currentConnections);

      client.join(`user_${userId}`);
      this.logger.log(`User ${userId} connected. Total connections: ${currentConnections.size}`);

      // Émettre le statut en ligne
      this.server.emit('userOnlineStatus', {
        userId,
        isOnline: true,
        connectionCount: currentConnections.size
      });

    } catch (error) {
      this.logger.error(`HandleUserConnection error for user ${userId}: ${error.message}`);
      throw error;
    }
  }

  private setupSocketListeners(socket: Socket) {
    const listeners = {
      disconnect: (reason: string) => {
        this.logger.debug(`Socket ${socket.id} disconnected: ${reason}`);
      },
      error: (error: Error) => {
        this.logger.error(`Socket ${socket.id} error: ${error.message}`);
      },
    };

    Object.entries(listeners).forEach(([event, handler]) => {
      socket.on(event, handler);
    });

    socket.data.listeners = listeners;
  }

  handleDisconnect(client: Socket) {
    try {
      this.cleanupSocketListeners(client);
      
      // Trouver et supprimer cette socket de toutes les connexions utilisateur
      for (const [userId, sockets] of this.userConnections.entries()) {
        if (sockets.has(client)) {
          sockets.delete(client);
          
          if (sockets.size === 0) {
            this.userConnections.delete(userId);
            // Émettre un événement de déconnexion
            this.server.emit('userOffline', { userId });
          } else {
            // Mettre à jour le statut avec le nouveau count
            this.server.emit('userOnlineStatus', {
              userId,
              isOnline: true,
              connectionCount: sockets.size
            });
          }
          break;
        }
      }
      
      this.logger.debug(`Client ${client.id} disconnected and cleaned up`);
    } catch (error) {
      this.logger.error(`Disconnect cleanup error: ${error.message}`);
    }
  }

  private cleanupSocketListeners(socket: Socket) {
    try {
      // Nettoyer les écouteurs personnalisés
      if (socket.data?.listeners) {
        Object.entries(socket.data.listeners).forEach(([event, handler]) => {
          socket.off(event, handler as (...args: any[]) => void);
        });
        delete socket.data.listeners;
      }
      
      // Nettoyer tous les autres écouteurs
      socket.removeAllListeners();
    } catch (error) {
      this.logger.error(`CleanupSocketListeners error: ${error.message}`);
    }
  }

  private cleanupSocket(socket: Socket, reason: string = 'Connection replaced') {
    try {
      this.cleanupSocketListeners(socket);
      
      // Informer le client qu'il a été déconnecté
      socket.emit('connectionReplaced', {
        message: reason,
        timestamp: new Date().toISOString()
      });

      // Déconnecter en douceur
      socket.disconnect(false);
      
      this.logger.log(`Socket ${socket.id} cleaned up: ${reason}`);
    } catch (error) {
      this.logger.error(`CleanupSocket error: ${error.message}`);
    }
  }

  private cleanupStaleConnections() {
    let cleanedCount = 0;
    
    for (const [userId, sockets] of this.userConnections.entries()) {
      const activeSockets = new Set<Socket>();
      
      for (const socket of sockets) {
        if (socket.connected) {
          activeSockets.add(socket);
        } else {
          cleanedCount++;
        }
      }
      
      if (activeSockets.size === 0) {
        this.userConnections.delete(userId);
        this.server.emit('userOffline', { userId });
      } else if (activeSockets.size !== sockets.size) {
        this.userConnections.set(userId, activeSockets);
        this.server.emit('userOnlineStatus', {
          userId,
          isOnline: true,
          connectionCount: activeSockets.size
        });
      }
    }
    
    if (cleanedCount > 0) {
      this.logger.debug(`Cleaned up ${cleanedCount} stale connections`);
    }
  }

  private cleanupAllConnections() {
    for (const [userId, sockets] of this.userConnections.entries()) {
      for (const socket of sockets) {
        this.cleanupSocket(socket, 'Server shutdown');
      }
    }
    this.userConnections.clear();
    this.connectionLock.clear();
  }

  private logMemoryUsage() {
    const memoryUsage = process.memoryUsage();
    this.logger.debug(`Memory usage - RSS: ${Math.round(memoryUsage.rss / 1024 / 1024)}MB, ` +
      `HeapTotal: ${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB, ` +
      `HeapUsed: ${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB, ` +
      `Connections: ${this.userConnections.size} users, ` +
      `Total sockets: ${Array.from(this.userConnections.values()).reduce((acc, set) => acc + set.size, 0)}`);
  }

  // Utility methods
  isUserOnline(userId: string): boolean {
    return this.userConnections.has(userId) && this.userConnections.get(userId)!.size > 0;
  }

  getUserSockets(userId: string): Socket[] {
    return this.userConnections.has(userId) 
      ? Array.from(this.userConnections.get(userId)!)
      : [];
  }

  // Les méthodes @SubscribeMessage restent inchangées mais sont incluses pour la complétude

  @SubscribeMessage('joinRoom')
  @UseGuards(WsJwtGuard)
  async handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomId: number,
  ) {
    try {
      const user = await this.authService.getUserFromSocket(client);
      if (!user) {
        throw new WsException('Unauthorized');
      }

      const room = await this.roomService.getRoom(roomId, user.id);
      if (!room) {
        throw new WsException('Room not found');
      }

      if (room.sender.id !== user.id && room.receiver.id !== user.id) {
        throw new WsException('Not a member of this room');
      }

      client.join(`room_${roomId}`);
      this.logger.log(`User ${user.id} joined room ${roomId}`);

      return { success: true, roomId };
    } catch (error) {
      this.logger.error(`JoinRoom error: ${error.message}`);
      throw new WsException(error.message);
    }
  }

  @SubscribeMessage('leaveRoom')
  @UseGuards(WsJwtGuard)
  async handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomId: number,
  ) {
    try {
      client.leave(`room_${roomId}`);
      return { success: true };
    } catch (error) {
      this.logger.error(`LeaveRoom error: ${error.message}`);
      throw new WsException(error.message);
    }
  }

  @SubscribeMessage('sendMessage')
  @UseGuards(WsJwtGuard)
  async handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: {
      roomId: number;
      content: string;
      isProposition?: boolean;
      type?: 'Message' | 'Proposition';
      propositionExpired?: string;
    },
  ) {
    try {
      const sender = await this.authService.getUserFromSocket(client);
      if (!sender) {
        throw new WsException('Unauthorized');
      }

      const room = await this.roomService.getRoom(data.roomId, sender.id);
      if (!room) {
        throw new WsException('Room not found');
      }

      if (room.sender.id !== sender.id && room.receiver.id !== sender.id) {
        throw new WsException('Not a member of this room');
      }

      const receiverId = room.sender.id === sender.id ? room.receiver.id : room.sender.id;
      const newMessage = await this.messageService.create({
        content: data.content,
        roomId: data.roomId,
        senderId: sender.id,
        isRead: false,
        isProposition: data.isProposition ? true : false,
        type: data.type,
        propositionExpired: data.propositionExpired,
      });

      this.server.to(`room_${data.roomId}`).emit('newMessage', newMessage);
      this.server.to(`user_${room.sender.id}`).emit('newMessageNotify', newMessage);
      
      this.updateConversationList(sender.id);
      this.updateConversationList(receiverId);

      await this.notifyNewMessage(data.roomId, sender.id);

      return { success: true, message: newMessage };
    } catch (error) {
      this.logger.error(`SendMessage error: ${error.message}`);
      throw new WsException(error.message);
    }
  }

  private async updateConversationList(userId: string) {
    try {
      const conversations = await this.roomService.getUserConversations(userId);
      this.server
        .to(`user_${userId}`)
        .emit('conversationsUpdated', conversations);
    } catch (error) {
      this.logger.error(`UpdateConversationList error for user ${userId}: ${error.message}`);
    }
  }

  @SubscribeMessage('conversationsUpdated')
  @UseGuards(WsJwtGuard)
  async handleSeenMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomId: number,
  ) {
    try {
      const user = await this.authService.getUserFromSocket(client);
      if (user) {
        this.updateConversationList(user.id);
      }
    } catch (error) {
      this.logger.error(`HandleSeenMessage error: ${error.message}`);
    }
  }

  @SubscribeMessage('typingStart')
  @UseGuards(WsJwtGuard)
  async handleTyping(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: number; isTyping: boolean },
  ) {
    try {
      const user = await this.authService.getUserFromSocket(client);
      if (user) {
        client.to(`room_${data.roomId}`).emit('userTyping', {
          userId: user.id,
          isTyping: data.isTyping,
        });
      }
    } catch (error) {
      this.logger.error(`HandleTyping error: ${error.message}`);
    }
  }

  @SubscribeMessage('typingStop')
  @UseGuards(WsJwtGuard)
  async handleTypingStop(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: number },
  ) {
    try {
      const user = await this.authService.getUserFromSocket(client);
      if (user) {
        client.to(`room_${data.roomId}`).emit('userStoppedTyping', {
          userId: user.id,
        });
      }
    } catch (error) {
      this.logger.error(`HandleTypingStop error: ${error.message}`);
    }
  }

  @SubscribeMessage('markAsRead')
  @UseGuards(WsJwtGuard)
  async handleMarkAsRead(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomId: number,
  ) {
    try {
      const user = await this.authService.getUserFromSocket(client);
      if (user) {
        const result = await this.roomService.resetUnreadCount(roomId, user.id);
        const totalUnread = await this.roomService.getTotalUnreadCount(user.id);

        this.server.to(`user_${user.id}`).emit('unreadUpdated', {
          roomId,
          count: result.count,
          totalUnread,
        });

        return { success: true };
      }
      return { success: false };
    } catch (error) {
      this.logger.error(`HandleMarkAsRead error: ${error.message}`);
      return { success: false };
    }
  }

  @SubscribeMessage('getUnreadCounts')
  @UseGuards(WsJwtGuard)
  async getTotalUnreadCount(
    @ConnectedSocket() client: Socket,
    @MessageBody() userId: string,
  ) {
    try {
      const user = await this.authService.getUserFromSocket(client);
      if (user && user.id === userId) {
        const totalUnread = await this.roomService.getTotalUnreadCount(userId);
        this.server.to(`user_${user.id}`).emit('unreadCounts', {
          totalUnread,
        });
      }
    } catch (error) {
      this.logger.error(`GetTotalUnreadCount error: ${error.message}`);
    }
  }

  async notifyNewMessage(roomId: number, senderId: string) {
    try {
      const room = await this.roomService.getRoom(roomId, senderId);
      if (!room) return;

      const receiverId = room.sender.id === senderId ? room.receiver.id : room.sender.id;
      const unreadCount = await this.roomService.incrementUnreadCount(roomId, receiverId);
      const totalUnread = await this.roomService.getTotalUnreadCount(receiverId);

      this.server.to(`user_${receiverId}`).emit('unreadUpdated', {
        roomId,
        unreadCount,
        totalUnread,
      });
    } catch (error) {
      this.logger.error(`NotifyNewMessage error: ${error.message}`);
    }
  }

  //#region Notification

  @SubscribeMessage('getNotifications')
  @UseGuards(WsJwtGuard)
  async GetNotifications(
    @MessageBody() data: { userId: string },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const user = await this.authService.getUserFromSocket(client);
      if (!user) {
        throw new WsException('Unauthorized');
      }

      const notifications = await this.notificationService.findAllByUser(data.userId);
      this.server.to(`user_${user.id}`).emit('notifications', notifications);
    } catch (error) {
      this.logger.error(`GetNotifications error: ${error.message}`);
      throw new WsException(error.message);
    }
  }

  @SubscribeMessage('markAsReadNotification')
  @UseGuards(WsJwtGuard)
  async markAsReadNotification(
    @MessageBody() data: { notificationId: number; userId: string },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const user = await this.authService.getUserFromSocket(client);
      if (!user || user.id !== data.userId) {
        throw new WsException('Unauthorized');
      }

      await this.notificationService.markAsRead(data.notificationId);
      client.emit('notificationMarkedAsRead', {
        userId: data.userId,
        success: true,
      });
    } catch (error) {
      this.logger.error(`MarkAsReadNotification error: ${error.message}`);
      client.emit('notificationMarkedAsRead', {
        userId: data.userId,
        success: false,
      });
    }
  }

  @SubscribeMessage('getUnreadCountsNotification')
  @UseGuards(WsJwtGuard)
  async getUnreadCountsNotification(
    @MessageBody() data: { userId: string },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const user = await this.authService.getUserFromSocket(client);
      if (!user) {
        throw new WsException('Unauthorized');
      }

      const unreadCountsNotification = await this.notificationService.getAllCountByReceiverId(data.userId);
      client.emit('unreadCountsNotification', unreadCountsNotification);
    } catch (error) {
      this.logger.error(`GetUnreadCountsNotification error: ${error.message}`);
      throw new WsException(error.message);
    }
  }

  //#endregion Notification

  @SubscribeMessage('checkIsAbonnement')
  @UseGuards(WsJwtGuard)
  async IsAbonnement(
    @MessageBody() data: { userId: string; transactionId: string },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const user = await this.authService.getUserFromSocket(client);
      if (!user || user.id !== data.userId) {
        throw new WsException('Unauthorized');
      }

      const hasActiveAbonnement = await this.abonnementService.createAbonnement(data);
      this.server.to(`user_${user.id}`).emit('isAbonnement', hasActiveAbonnement);
    } catch (error) {
      this.logger.error(`IsAbonnement error: ${error.message}`);
      throw new WsException(error.message);
    }
  }

  @SubscribeMessage('isAbonnementUser') 
  @UseGuards(WsJwtGuard)
  async checkIsAbonnementStatus(
    @MessageBody() data: { userId: string },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const user = await this.authService.getUserFromSocket(client);
      if (!user || user.id !== data.userId) {
        throw new WsException('Unauthorized');
      }

      const hasActiveAbonnement = await this.abonnementService.isAbonnement(data.userId);
      this.server.to(`user_${user.id}`).emit('isAbonnement', hasActiveAbonnement);

    } catch (error) {
      this.logger.error(`CheckIsAbonnementStatus error: ${error.message}`);
      throw new WsException(error.message);
    }
  }

  @SubscribeMessage('checkPaymentPoint')
  @UseGuards(WsJwtGuard)
  async checkPaymentPoint(
    @MessageBody() data: { userId: string; transactionId: string; points: number },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const user = await this.authService.getUserFromSocket(client);
      if (!user || user.id !== data.userId) {
        throw new WsException('Unauthorized');
      }

      const hasActiveAbonnement = await this.abonnementService.createPaymentPoint(data);
      this.server.to(`user_${user.id}`).emit('checkPaymentPoint', hasActiveAbonnement);
    } catch (error) {
      this.logger.error(`checkPaymentPoint error: ${error.message}`);
      throw new WsException(error.message);
    }
  }

  @SubscribeMessage('userOnline')
  @UseGuards(WsJwtGuard)
  async handleUserOnline(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { userId: string },
  ) {
    try {
      const user = await this.authService.getUserFromSocket(client);
      if (!user) {
        throw new WsException('Unauthorized');
      }

      this.server.emit('userOnlineStatus', {
        userId: data.userId,
        isOnline: this.isUserOnline(data.userId),
        connectionCount: this.userConnections.get(data.userId)?.size || 0
      });

      return { success: true };
    } catch (error) {
      this.logger.error(`HandleUserOnline error: ${error.message}`);
      throw new WsException(error.message);
    }
  }

  @SubscribeMessage('checkMultipleUsersStatus')
  @UseGuards(WsJwtGuard)
  async handleCheckMultipleUsersStatus(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { userIds: string[] },
  ) {
    try {
      const user = await this.authService.getUserFromSocket(client);
      if (!user) {
        throw new WsException('Unauthorized');
      }

      const onlineStatus = data.userIds.reduce((acc, userId) => {
        acc[userId] = this.isUserOnline(userId);
        return acc;
      }, {} as Record<string, boolean>);

      client.emit('multipleUsersStatus', onlineStatus);
      return { success: true, onlineStatus };
    } catch (error) {
      this.logger.error(`HandleCheckMultipleUsersStatus error: ${error.message}`);
      throw new WsException(error.message);
    }
  }
}