import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomsService } from '../rooms/rooms.service';
import { AuthService } from '../auth/auth.service';
import { Logger, UseGuards } from '@nestjs/common';
import { WsJwtGuard } from '../auth/ws-auth.guard';
import { MessageService } from '../messages/messages.service';
import { AbonnementService } from '../abonnement/abonnement.service';
import { CreateAbonnementDto } from '../abonnement/dtos/create-abonnement.dto';
import { NotificationService } from '../notification/notification.service';
import { use } from 'passport';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  transports: ['websocket'], // Force WebSocket transport
  pingTimeout: 600000, // 10s
  pingInterval: 80000, // 5s
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(ChatGateway.name);
  private connectedUsers: Map<string, Socket> = new Map();
  private readonly connectionLock = new Map<string, Promise<void>>();

  constructor(
    private readonly roomService: RoomsService,
    private readonly authService: AuthService,
    private readonly messageService: MessageService,
    private readonly abonnementService: AbonnementService,
    private readonly notificationService: NotificationService,
  ) {}

  afterInit(server: Server) {
    server.sockets.setMaxListeners(200); // Reasonable limit
    this.logger.log('WebSocket Gateway initialized');
  }

  async handleConnection(client: Socket) {
    const userId = await this.authService.getUserFromSocket(client);
    if (!userId) {
      client.disconnect(true);
      return;
    }

    // Verrou pour éviter les connexions parallèles
    if (!this.connectionLock.has(userId.id)) {
      const connectionPromise = (async () => {
        try {
          await this.handleNewConnection(userId.id, client);
        } finally {
          this.connectionLock.delete(userId.id);
        }
      })();

      this.connectionLock.set(userId.id, connectionPromise);
    }

    await this.connectionLock.get(userId.id);
  }

  private async handleNewConnection(userId: string, client: Socket) {
    // Nettoyer les anciennes connexions
    // const existingSocket = this.connectedUsers.get(userId);
    // if (existingSocket && existingSocket.id !== client.id) {
    //   this.logger.log(`Cleaning old connection for user ${userId}`);
    //   this.cleanupSocket(existingSocket);
    //   this.connectedUsers.delete(userId);
    // }

    // Enregistrer la nouvelle connexion
    this.connectedUsers.set(userId, client);
    client.join(`user_${userId}`);

    // Configurer le handler de déconnexion
    const disconnectHandler = () =>
      this.handleUserDisconnect(userId, client.id);
    client.on('disconnect', disconnectHandler);
    client.data.disconnectHandler = disconnectHandler;

    this.logger.log(`User ${userId} connected (Socket ${client.id})`);
  }

  private cleanupSocket(socket: Socket) {
    if (socket.data?.disconnectHandler) {
      socket.off('disconnect', socket.data.disconnectHandler);
    }
    socket.disconnect(true);
  }

  private removeAllListeners(socket: Socket) {
    if (socket.data?.listeners) {
      Object.entries(socket.data.listeners).forEach(([event, handler]) => {
        socket.off(event, handler as (...args: any[]) => void);
      });
      delete socket.data.listeners;
    }
  }

  private handleUserDisconnect(userId: string, socketId: string) {
    const currentSocket = this.connectedUsers.get(userId);
    if (currentSocket?.id === socketId) {
      this.removeAllListeners(currentSocket);
      this.connectedUsers.delete(userId);
      this.logger.log(`User ${userId} disconnected (Socket ${socketId})`);
    }
  }

  handleDisconnect(client: Socket) {
    // Additional cleanup if needed
  }

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

      const room = await this.roomService.getRoom(roomId);
      if (!room) {
        throw new WsException('Rooms not found');
      }

      // Verify user is part of this room
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
    client.leave(`room_${roomId}`);
    return { success: true };
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

      const room = await this.roomService.getRoom(data.roomId);
      if (!room) {
        throw new WsException('Rooms not found');
      }

      // Verify user is part of this room
      if (room.sender.id !== sender.id && room.receiver.id !== sender.id) {
        throw new WsException('Not a member of this room');
      }

      const receiverId =
        room.sender.id === sender.id ? room.receiver.id : room.sender.id;
      const isReceiverOnline = this.isUserOnline(receiverId);
      const newMessage = await this.messageService.create({
        content: data.content,
        roomId: data.roomId,
        senderId: sender.id,
        isRead: false,
        isProposition: data.isProposition ? true : false,
        type: data.type,
        propositionExpired: data.propositionExpired,
      });

      // Emit to room members
      this.server.to(`room_${data.roomId}`).emit('newMessage', newMessage);

      // Update conversation lists
      this.updateConversationList(sender.id);
      this.updateConversationList(receiverId);

      // Handle notifications if receiver is offline
      // if (!isReceiverOnline) {
      await this.notifyNewMessage(data.roomId, sender.id);
      // }

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
      this.logger.error(
        `UpdateConversationList error for user ${userId}: ${error.message}`,
      );
    }
  }

  @SubscribeMessage('conversationsUpdated')
  @UseGuards(WsJwtGuard)
  async handleSeenMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomId: number,
  ) {
    const user = await this.authService.getUserFromSocket(client);
    if (user) {
      this.updateConversationList(user.id);
    }
  }

  @SubscribeMessage('typingStart')
  @UseGuards(WsJwtGuard)
  async handleTyping(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: number; isTyping: boolean },
  ) {
    const user = await this.authService.getUserFromSocket(client);
    if (user) {
      client.to(`room_${data.roomId}`).emit('userTyping', {
        userId: user.id,
        isTyping: data.isTyping,
      });
    }
  }

  @SubscribeMessage('typingStop')
  @UseGuards(WsJwtGuard)
  async handleTypingStop(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: number },
  ) {
    const user = await this.authService.getUserFromSocket(client);
    if (user) {
      client.to(`room_${data.roomId}`).emit('userStoppedTyping', {
        userId: user.id,
      });
    }
  }

  @SubscribeMessage('markAsRead')
  @UseGuards(WsJwtGuard)
  async handleMarkAsRead(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomId: number,
  ) {
    const user = await this.authService.getUserFromSocket(client);
    if (user) {
      // this.updateConversationList(user.id);
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
  }

  @SubscribeMessage('getUnreadCounts')
  @UseGuards(WsJwtGuard)
  async getTotalUnreadCount(
    @ConnectedSocket() client: Socket,
    @MessageBody() userId: string,
  ) {
    const user = await this.authService.getUserFromSocket(client);
    if (user && user.id === userId) {
      this.server.to(`user_${user.id}`).emit('unreadCounts', {
        totalUnread: await this.roomService.getTotalUnreadCount(userId),
      });
    }
  }

  async notifyNewMessage(roomId: number, senderId: string) {
    try {
      const room = await this.roomService.getRoom(roomId);
      if (!room) return;

      const receiverId =
        room.sender.id === senderId ? room.receiver.id : room.sender.id;
      const unreadCount = await this.roomService.incrementUnreadCount(
        roomId,
        receiverId,
      );
      const totalUnread =
        await this.roomService.getTotalUnreadCount(receiverId);

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

      const notifications = await this.notificationService.getNotifications(
        data.userId,
      );
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

      const unreadCountsNotification =
        await this.notificationService.getAllCountByReceiverId(data.userId);

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

      const hasActiveAbonnement =
        await this.abonnementService.createAbonnement(data);

      this.server
        .to(`user_${user.id}`)
        .emit('isAbonnement', hasActiveAbonnement);
    } catch (error) {
      this.logger.error(`IsAbonnement error: ${error.message}`);
      throw new WsException(error.message);
    }
  }

  @SubscribeMessage('checkPaymentPoint')
  @UseGuards(WsJwtGuard)
  async checkPaymentPoint(
    @MessageBody() data: { userId: string; transactionId: string, points: number },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const user = await this.authService.getUserFromSocket(client);
      if (!user || user.id !== data.userId) {
        throw new WsException('Unauthorized');
      }

      const hasActiveAbonnement =
        await this.abonnementService.createPaymentPoint(data);

      this.server
        .to(`user_${user.id}`)
        .emit('checkPaymentPoint', hasActiveAbonnement);
    } catch (error) {
      this.logger.error(`checkPaymentPoint error: ${error.message}`);
      throw new WsException(error.message);
    }
  }

  // Utility methods
  isUserOnline(userId: string): boolean {
    return this.connectedUsers.has(userId);
  }

  getUserSocket(userId: string): Socket | undefined {
    return this.connectedUsers.get(userId);
  }
}
