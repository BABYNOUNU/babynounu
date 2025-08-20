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
    userConnections = new Map();
    connectionLock = new Map();
    cleanupInterval;
    MAX_CONNECTIONS_PER_USER = 5;
    constructor(roomService, authService, messageService, abonnementService, notificationService) {
        this.roomService = roomService;
        this.authService = authService;
        this.messageService = messageService;
        this.abonnementService = abonnementService;
        this.notificationService = notificationService;
    }
    onModuleInit() {
        this.cleanupInterval = setInterval(() => {
            this.cleanupStaleConnections();
            this.logMemoryUsage();
        }, 300000);
    }
    onModuleDestroy() {
        if (this.cleanupInterval) {
            clearInterval(this.cleanupInterval);
        }
        this.cleanupAllConnections();
    }
    afterInit(server) {
        server.sockets.setMaxListeners(50);
    }
    async handleConnection(client) {
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
        }
        catch (error) {
            this.logger.error(`HandleConnection error: ${error.message}`);
            client.disconnect(true);
        }
    }
    async handleUserConnection(userId, client) {
        try {
            const currentConnections = this.userConnections.get(userId) || new Set();
            if (currentConnections.size >= this.MAX_CONNECTIONS_PER_USER) {
                const oldestSocket = Array.from(currentConnections)[0];
                this.cleanupSocket(oldestSocket, 'Too many connections');
            }
            this.setupSocketListeners(client);
            currentConnections.add(client);
            this.userConnections.set(userId, currentConnections);
            client.join(`user_${userId}`);
            this.logger.log(`User ${userId} connected. Total connections: ${currentConnections.size}`);
            this.server.emit('userOnlineStatus', {
                userId,
                isOnline: true,
                connectionCount: currentConnections.size
            });
        }
        catch (error) {
            this.logger.error(`HandleUserConnection error for user ${userId}: ${error.message}`);
            throw error;
        }
    }
    setupSocketListeners(socket) {
        const listeners = {
            disconnect: (reason) => {
                this.logger.debug(`Socket ${socket.id} disconnected: ${reason}`);
            },
            error: (error) => {
                this.logger.error(`Socket ${socket.id} error: ${error.message}`);
            },
        };
        Object.entries(listeners).forEach(([event, handler]) => {
            socket.on(event, handler);
        });
        socket.data.listeners = listeners;
    }
    handleDisconnect(client) {
        try {
            this.cleanupSocketListeners(client);
            for (const [userId, sockets] of this.userConnections.entries()) {
                if (sockets.has(client)) {
                    sockets.delete(client);
                    if (sockets.size === 0) {
                        this.userConnections.delete(userId);
                        this.server.emit('userOffline', { userId });
                    }
                    else {
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
        }
        catch (error) {
            this.logger.error(`Disconnect cleanup error: ${error.message}`);
        }
    }
    cleanupSocketListeners(socket) {
        try {
            if (socket.data?.listeners) {
                Object.entries(socket.data.listeners).forEach(([event, handler]) => {
                    socket.off(event, handler);
                });
                delete socket.data.listeners;
            }
            socket.removeAllListeners();
        }
        catch (error) {
            this.logger.error(`CleanupSocketListeners error: ${error.message}`);
        }
    }
    cleanupSocket(socket, reason = 'Connection replaced') {
        try {
            this.cleanupSocketListeners(socket);
            socket.emit('connectionReplaced', {
                message: reason,
                timestamp: new Date().toISOString()
            });
            socket.disconnect(false);
            this.logger.log(`Socket ${socket.id} cleaned up: ${reason}`);
        }
        catch (error) {
            this.logger.error(`CleanupSocket error: ${error.message}`);
        }
    }
    cleanupStaleConnections() {
        let cleanedCount = 0;
        for (const [userId, sockets] of this.userConnections.entries()) {
            const activeSockets = new Set();
            for (const socket of sockets) {
                if (socket.connected) {
                    activeSockets.add(socket);
                }
                else {
                    cleanedCount++;
                }
            }
            if (activeSockets.size === 0) {
                this.userConnections.delete(userId);
                this.server.emit('userOffline', { userId });
            }
            else if (activeSockets.size !== sockets.size) {
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
    cleanupAllConnections() {
        for (const [userId, sockets] of this.userConnections.entries()) {
            for (const socket of sockets) {
                this.cleanupSocket(socket, 'Server shutdown');
            }
        }
        this.userConnections.clear();
        this.connectionLock.clear();
    }
    logMemoryUsage() {
        const memoryUsage = process.memoryUsage();
        this.logger.debug(`Memory usage - RSS: ${Math.round(memoryUsage.rss / 1024 / 1024)}MB, ` +
            `HeapTotal: ${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB, ` +
            `HeapUsed: ${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB, ` +
            `Connections: ${this.userConnections.size} users, ` +
            `Total sockets: ${Array.from(this.userConnections.values()).reduce((acc, set) => acc + set.size, 0)}`);
    }
    isUserOnline(userId) {
        return this.userConnections.has(userId) && this.userConnections.get(userId).size > 0;
    }
    getUserSockets(userId) {
        return this.userConnections.has(userId)
            ? Array.from(this.userConnections.get(userId))
            : [];
    }
    async handleJoinRoom(client, roomId) {
        try {
            const user = await this.authService.getUserFromSocket(client);
            if (!user) {
                throw new websockets_1.WsException('Unauthorized');
            }
            const room = await this.roomService.getRoom(roomId, user.id);
            if (!room) {
                throw new websockets_1.WsException('Room not found');
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
        try {
            client.leave(`room_${roomId}`);
            return { success: true };
        }
        catch (error) {
            this.logger.error(`LeaveRoom error: ${error.message}`);
            throw new websockets_1.WsException(error.message);
        }
    }
    async handleSendMessage(client, data) {
        try {
            const sender = await this.authService.getUserFromSocket(client);
            if (!sender) {
                throw new websockets_1.WsException('Unauthorized');
            }
            const room = await this.roomService.getRoom(data.roomId, sender.id);
            if (!room) {
                throw new websockets_1.WsException('Room not found');
            }
            if (room.sender.id !== sender.id && room.receiver.id !== sender.id) {
                throw new websockets_1.WsException('Not a member of this room');
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
        try {
            const user = await this.authService.getUserFromSocket(client);
            if (user) {
                this.updateConversationList(user.id);
            }
        }
        catch (error) {
            this.logger.error(`HandleSeenMessage error: ${error.message}`);
        }
    }
    async handleTyping(client, data) {
        try {
            const user = await this.authService.getUserFromSocket(client);
            if (user) {
                client.to(`room_${data.roomId}`).emit('userTyping', {
                    userId: user.id,
                    isTyping: data.isTyping,
                });
            }
        }
        catch (error) {
            this.logger.error(`HandleTyping error: ${error.message}`);
        }
    }
    async handleTypingStop(client, data) {
        try {
            const user = await this.authService.getUserFromSocket(client);
            if (user) {
                client.to(`room_${data.roomId}`).emit('userStoppedTyping', {
                    userId: user.id,
                });
            }
        }
        catch (error) {
            this.logger.error(`HandleTypingStop error: ${error.message}`);
        }
    }
    async handleMarkAsRead(client, roomId) {
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
        }
        catch (error) {
            this.logger.error(`HandleMarkAsRead error: ${error.message}`);
            return { success: false };
        }
    }
    async getTotalUnreadCount(client, userId) {
        try {
            const user = await this.authService.getUserFromSocket(client);
            if (user && user.id === userId) {
                const totalUnread = await this.roomService.getTotalUnreadCount(userId);
                this.server.to(`user_${user.id}`).emit('unreadCounts', {
                    totalUnread,
                });
            }
        }
        catch (error) {
            this.logger.error(`GetTotalUnreadCount error: ${error.message}`);
        }
    }
    async notifyNewMessage(roomId, senderId) {
        try {
            const room = await this.roomService.getRoom(roomId, senderId);
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
            const notifications = await this.notificationService.findAllByUser(data.userId);
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
            this.server.to(`user_${user.id}`).emit('isAbonnement', hasActiveAbonnement);
        }
        catch (error) {
            this.logger.error(`IsAbonnement error: ${error.message}`);
            throw new websockets_1.WsException(error.message);
        }
    }
    async checkIsAbonnementStatus(data, client) {
        try {
            const user = await this.authService.getUserFromSocket(client);
            if (!user || user.id !== data.userId) {
                throw new websockets_1.WsException('Unauthorized');
            }
            const hasActiveAbonnement = await this.abonnementService.isAbonnement(data.userId);
            this.server.to(`user_${user.id}`).emit('isAbonnement', hasActiveAbonnement);
        }
        catch (error) {
            this.logger.error(`CheckIsAbonnementStatus error: ${error.message}`);
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
            this.server.to(`user_${user.id}`).emit('checkPaymentPoint', hasActiveAbonnement);
        }
        catch (error) {
            this.logger.error(`checkPaymentPoint error: ${error.message}`);
            throw new websockets_1.WsException(error.message);
        }
    }
    async handleUserOnline(client, data) {
        try {
            const user = await this.authService.getUserFromSocket(client);
            if (!user) {
                throw new websockets_1.WsException('Unauthorized');
            }
            this.server.emit('userOnlineStatus', {
                userId: data.userId,
                isOnline: this.isUserOnline(data.userId),
                connectionCount: this.userConnections.get(data.userId)?.size || 0
            });
            return { success: true };
        }
        catch (error) {
            this.logger.error(`HandleUserOnline error: ${error.message}`);
            throw new websockets_1.WsException(error.message);
        }
    }
    async handleCheckMultipleUsersStatus(client, data) {
        try {
            const user = await this.authService.getUserFromSocket(client);
            if (!user) {
                throw new websockets_1.WsException('Unauthorized');
            }
            const onlineStatus = data.userIds.reduce((acc, userId) => {
                acc[userId] = this.isUserOnline(userId);
                return acc;
            }, {});
            client.emit('multipleUsersStatus', onlineStatus);
            return { success: true, onlineStatus };
        }
        catch (error) {
            this.logger.error(`HandleCheckMultipleUsersStatus error: ${error.message}`);
            throw new websockets_1.WsException(error.message);
        }
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
    (0, websockets_1.SubscribeMessage)('isAbonnementUser'),
    (0, common_1.UseGuards)(ws_auth_guard_1.WsJwtGuard),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "checkIsAbonnementStatus", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('checkPaymentPoint'),
    (0, common_1.UseGuards)(ws_auth_guard_1.WsJwtGuard),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "checkPaymentPoint", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('userOnline'),
    (0, common_1.UseGuards)(ws_auth_guard_1.WsJwtGuard),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleUserOnline", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('checkMultipleUsersStatus'),
    (0, common_1.UseGuards)(ws_auth_guard_1.WsJwtGuard),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleCheckMultipleUsersStatus", null);
exports.ChatGateway = ChatGateway = ChatGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: process.env.FRONTEND_URL || '*',
            credentials: true,
        },
        pingTimeout: 60000,
        pingInterval: 25000,
        maxHttpBufferSize: 1e6,
        connectTimeout: 45000,
    }),
    __metadata("design:paramtypes", [rooms_service_1.RoomsService,
        auth_service_1.AuthService,
        messages_service_1.MessageService,
        abonnement_service_1.AbonnementService,
        notification_service_1.NotificationService])
], ChatGateway);
