"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ChatGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const rooms_service_1 = require("../rooms/rooms.service");
const auth_service_1 = require("../auth/auth.service");
const common_1 = require("@nestjs/common");
const ws_auth_guard_1 = require("../auth/ws-auth.guard");
const messages_service_1 = require("../messages/messages.service");
const abonnement_service_1 = require("../abonnement/abonnement.service");
const notification_service_1 = require("../notification/notification.service");
let ChatGateway = ChatGateway_1 = class ChatGateway {
    roomService;
    authService;
    messageService;
    abonnementService;
    notificationService;
    server;
    logger = new common_1.Logger(ChatGateway_1.name);
    connectedUsers = new Map();
    connectionLock = new Map();
    constructor(roomService, authService, messageService, abonnementService, notificationService) {
        this.roomService = roomService;
        this.authService = authService;
        this.messageService = messageService;
        this.abonnementService = abonnementService;
        this.notificationService = notificationService;
    }
    afterInit(server) {
        server.sockets.setMaxListeners(200);
        this.logger.log('WebSocket Gateway initialized');
    }
    async handleConnection(client) {
        const userId = await this.authService.getUserFromSocket(client);
        if (!userId) {
            client.disconnect(true);
            return;
        }
        if (!this.connectionLock.has(userId.id)) {
            const connectionPromise = (async () => {
                try {
                    await this.handleNewConnection(userId.id, client);
                }
                finally {
                    this.connectionLock.delete(userId.id);
                }
            })();
            this.connectionLock.set(userId.id, connectionPromise);
        }
        await this.connectionLock.get(userId.id);
    }
    async handleNewConnection(userId, client) {
        this.connectedUsers.set(userId, client);
        client.join(`user_${userId}`);
        const disconnectHandler = () => this.handleUserDisconnect(userId, client.id);
        client.on('disconnect', disconnectHandler);
        client.data.disconnectHandler = disconnectHandler;
        this.logger.log(`User ${userId} connected (Socket ${client.id})`);
    }
    cleanupSocket(socket) {
        if (socket.data?.disconnectHandler) {
            socket.off('disconnect', socket.data.disconnectHandler);
        }
        socket.disconnect(true);
    }
    removeAllListeners(socket) {
        if (socket.data?.listeners) {
            Object.entries(socket.data.listeners).forEach(([event, handler]) => {
                socket.off(event, handler);
            });
            delete socket.data.listeners;
        }
    }
    handleUserDisconnect(userId, socketId) {
        const currentSocket = this.connectedUsers.get(userId);
        if (currentSocket?.id === socketId) {
            this.removeAllListeners(currentSocket);
            this.connectedUsers.delete(userId);
            this.logger.log(`User ${userId} disconnected (Socket ${socketId})`);
        }
    }
    handleDisconnect(client) {
    }
    async handleJoinRoom(client, roomId) {
        try {
            const user = await this.authService.getUserFromSocket(client);
            if (!user) {
                throw new websockets_1.WsException('Unauthorized');
            }
            const room = await this.roomService.getRoom(roomId);
            if (!room) {
                throw new websockets_1.WsException('Rooms not found');
            }
            if (room.sender.id !== user.id && room.receiver.id !== user.id) {
                throw new websockets_1.WsException('Not a member of this room');
            }
            client.join(`room_${roomId}`);
            this.logger.log(`User ${user.id} joined room ${roomId}`);
            return { success: true, roomId };
        }
        catch (error) {
            this.logger.error(`JoinRoom error: ${error.message}`);
            throw new websockets_1.WsException(error.message);
        }
    }
    async handleLeaveRoom(client, roomId) {
        client.leave(`room_${roomId}`);
        return { success: true };
    }
    async handleSendMessage(client, data) {
        try {
            const sender = await this.authService.getUserFromSocket(client);
            if (!sender) {
                throw new websockets_1.WsException('Unauthorized');
            }
            const room = await this.roomService.getRoom(data.roomId);
            if (!room) {
                throw new websockets_1.WsException('Rooms not found');
            }
            if (room.sender.id !== sender.id && room.receiver.id !== sender.id) {
                throw new websockets_1.WsException('Not a member of this room');
            }
            const receiverId = room.sender.id === sender.id ? room.receiver.id : room.sender.id;
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
            this.server.to(`room_${data.roomId}`).emit('newMessage', newMessage);
            this.updateConversationList(sender.id);
            this.updateConversationList(receiverId);
            await this.notifyNewMessage(data.roomId, sender.id);
            return { success: true, message: newMessage };
        }
        catch (error) {
            this.logger.error(`SendMessage error: ${error.message}`);
            throw new websockets_1.WsException(error.message);
        }
    }
    async updateConversationList(userId) {
        try {
            const conversations = await this.roomService.getUserConversations(userId);
            this.server
                .to(`user_${userId}`)
                .emit('conversationsUpdated', conversations);
        }
        catch (error) {
            this.logger.error(`UpdateConversationList error for user ${userId}: ${error.message}`);
        }
    }
    async handleSeenMessage(client, roomId) {
        const user = await this.authService.getUserFromSocket(client);
        if (user) {
            this.updateConversationList(user.id);
        }
    }
    async handleTyping(client, data) {
        const user = await this.authService.getUserFromSocket(client);
        if (user) {
            client.to(`room_${data.roomId}`).emit('userTyping', {
                userId: user.id,
                isTyping: data.isTyping,
            });
        }
    }
    async handleTypingStop(client, data) {
        const user = await this.authService.getUserFromSocket(client);
        if (user) {
            client.to(`room_${data.roomId}`).emit('userStoppedTyping', {
                userId: user.id,
            });
        }
    }
    async handleMarkAsRead(client, roomId) {
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
    }
    async getTotalUnreadCount(client, userId) {
        const user = await this.authService.getUserFromSocket(client);
        if (user && user.id === userId) {
            this.server.to(`user_${user.id}`).emit('unreadCounts', {
                totalUnread: await this.roomService.getTotalUnreadCount(userId),
            });
        }
    }
    async notifyNewMessage(roomId, senderId) {
        try {
            const room = await this.roomService.getRoom(roomId);
            if (!room)
                return;
            const receiverId = room.sender.id === senderId ? room.receiver.id : room.sender.id;
            const unreadCount = await this.roomService.incrementUnreadCount(roomId, receiverId);
            const totalUnread = await this.roomService.getTotalUnreadCount(receiverId);
            this.server.to(`user_${receiverId}`).emit('unreadUpdated', {
                roomId,
                unreadCount,
                totalUnread,
            });
        }
        catch (error) {
            this.logger.error(`NotifyNewMessage error: ${error.message}`);
        }
    }
    async GetNotifications(data, client) {
        try {
            const user = await this.authService.getUserFromSocket(client);
            if (!user) {
                throw new websockets_1.WsException('Unauthorized');
            }
            const notifications = await this.notificationService.getNotifications(data.userId);
            this.server.to(`user_${user.id}`).emit('notifications', notifications);
        }
        catch (error) {
            this.logger.error(`GetNotifications error: ${error.message}`);
            throw new websockets_1.WsException(error.message);
        }
    }
    async markAsReadNotification(data, client) {
        try {
            const user = await this.authService.getUserFromSocket(client);
            if (!user || user.id !== data.userId) {
                throw new websockets_1.WsException('Unauthorized');
            }
            await this.notificationService.markAsRead(data.notificationId);
            client.emit('notificationMarkedAsRead', {
                userId: data.userId,
                success: true,
            });
        }
        catch (error) {
            this.logger.error(`MarkAsReadNotification error: ${error.message}`);
            client.emit('notificationMarkedAsRead', {
                userId: data.userId,
                success: false,
            });
        }
    }
    async getUnreadCountsNotification(data, client) {
        try {
            const user = await this.authService.getUserFromSocket(client);
            if (!user) {
                throw new websockets_1.WsException('Unauthorized');
            }
            const unreadCountsNotification = await this.notificationService.getAllCountByReceiverId(data.userId);
            client.emit('unreadCountsNotification', unreadCountsNotification);
        }
        catch (error) {
            this.logger.error(`GetUnreadCountsNotification error: ${error.message}`);
            throw new websockets_1.WsException(error.message);
        }
    }
    async IsAbonnement(data, client) {
        try {
            const user = await this.authService.getUserFromSocket(client);
            if (!user || user.id !== data.userId) {
                throw new websockets_1.WsException('Unauthorized');
            }
            const hasActiveAbonnement = await this.abonnementService.createAbonnement(data);
            this.server
                .to(`user_${user.id}`)
                .emit('isAbonnement', hasActiveAbonnement);
        }
        catch (error) {
            this.logger.error(`IsAbonnement error: ${error.message}`);
            throw new websockets_1.WsException(error.message);
        }
    }
    async checkPaymentPoint(data, client) {
        try {
            const user = await this.authService.getUserFromSocket(client);
            if (!user || user.id !== data.userId) {
                throw new websockets_1.WsException('Unauthorized');
            }
            const hasActiveAbonnement = await this.abonnementService.createPaymentPoint(data);
            this.server
                .to(`user_${user.id}`)
                .emit('checkPaymentPoint', hasActiveAbonnement);
        }
        catch (error) {
            this.logger.error(`checkPaymentPoint error: ${error.message}`);
            throw new websockets_1.WsException(error.message);
        }
    }
    isUserOnline(userId) {
        return this.connectedUsers.has(userId);
    }
    getUserSocket(userId) {
        return this.connectedUsers.get(userId);
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinRoom'),
    (0, common_1.UseGuards)(ws_auth_guard_1.WsJwtGuard),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Number]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleJoinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leaveRoom'),
    (0, common_1.UseGuards)(ws_auth_guard_1.WsJwtGuard),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Number]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleLeaveRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessage'),
    (0, common_1.UseGuards)(ws_auth_guard_1.WsJwtGuard),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleSendMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('conversationsUpdated'),
    (0, common_1.UseGuards)(ws_auth_guard_1.WsJwtGuard),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Number]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleSeenMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('typingStart'),
    (0, common_1.UseGuards)(ws_auth_guard_1.WsJwtGuard),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleTyping", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('typingStop'),
    (0, common_1.UseGuards)(ws_auth_guard_1.WsJwtGuard),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleTypingStop", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('markAsRead'),
    (0, common_1.UseGuards)(ws_auth_guard_1.WsJwtGuard),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Number]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleMarkAsRead", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getUnreadCounts'),
    (0, common_1.UseGuards)(ws_auth_guard_1.WsJwtGuard),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "getTotalUnreadCount", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getNotifications'),
    (0, common_1.UseGuards)(ws_auth_guard_1.WsJwtGuard),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "GetNotifications", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('markAsReadNotification'),
    (0, common_1.UseGuards)(ws_auth_guard_1.WsJwtGuard),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "markAsReadNotification", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getUnreadCountsNotification'),
    (0, common_1.UseGuards)(ws_auth_guard_1.WsJwtGuard),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "getUnreadCountsNotification", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('checkIsAbonnement'),
    (0, common_1.UseGuards)(ws_auth_guard_1.WsJwtGuard),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "IsAbonnement", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('checkPaymentPoint'),
    (0, common_1.UseGuards)(ws_auth_guard_1.WsJwtGuard),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "checkPaymentPoint", null);
exports.ChatGateway = ChatGateway = ChatGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: "*",
            credentials: true,
        },
        pingTimeout: 60000,
        pingInterval: 25000,
    }),
    __metadata("design:paramtypes", [rooms_service_1.RoomsService,
        auth_service_1.AuthService,
        messages_service_1.MessageService,
        abonnement_service_1.AbonnementService,
        notification_service_1.NotificationService])
], ChatGateway);
