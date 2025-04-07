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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const rooms_service_1 = require("../rooms/rooms.service");
const messages_service_1 = require("../messages/messages.service");
const user_service_1 = require("../user/user.service");
let ChatGateway = class ChatGateway {
    roomService;
    messageService;
    userService;
    server;
    constructor(roomService, messageService, userService) {
        this.roomService = roomService;
        this.messageService = messageService;
        this.userService = userService;
    }
    async handleJoinRoom(data, client) {
        client.join(`room_${data.roomId}`);
    }
    async handleMessage(data, client) {
        const userClient = client.handshake.auth.user;
        const room = await this.roomService.findOne(data.roomId);
        const message = await this.messageService.create({
            content: data.content,
            roomId: data.roomId,
            senderId: userClient.id,
        });
        await this.updateUnreadCounters(userClient, room.id);
        this.server.to(`room_${data.roomId}`).emit('newMessage', message);
        this.server.emit('updateConversationList');
        this.server.emit('requestRefreshUnreadCounts');
        await this.handleUserNotifications(userClient, data, room);
    }
    async updateUnreadCounters(user, roomId) {
        if (user.type_profil.slug === 'parent') {
            await this.roomService.incrementUnreadCount(roomId, 'nounu');
            await this.roomService.incrementUnreadCount(roomId, 'administrateur');
        }
        else if (user.type_profil.slug === 'nounu') {
            await this.roomService.incrementUnreadCount(roomId, 'parent');
        }
        else if (user.type_profil.slug === 'administrateur') {
            const room = await this.roomService.findOne(roomId);
            if (room.parent.user.id == user.id) {
                await this.roomService.incrementUnreadCount(roomId, 'nounu');
            }
            else {
                await this.roomService.incrementUnreadCount(roomId, 'parent');
            }
        }
    }
    async handleUserNotifications(userClient, messageData, room) {
        if (userClient.type_profil.slug === 'parent') {
            this.userService.registerSocket(messageData.toSender, userClient.id);
            const nounuSocket = await this.userService.findSocket(messageData.toSender);
            if (nounuSocket) {
                this.server.emit('updateConversationList');
                this.userService.removeSocket(messageData.toSender);
            }
            this.userService.removeSocket(messageData.toSender);
        }
        else if (userClient.type_profil.slug === 'administrateur') {
            this.userService.registerSocket(room.parent.user.id, userClient.id);
            const parentSocket = await this.userService.findSocket(room.parent.user.id);
            if (parentSocket) {
                this.server.to(parentSocket).emit('updateConversationList');
                this.userService.removeSocket(room.parent.user.id);
            }
            this.userService.removeSocket(room.parent.user.id);
        }
    }
    async getConversationsForUser(client) {
        const userClient = client.handshake.auth.user;
        const AllConversations = await this.roomService.getConversationsForUser(userClient.id);
        this.server.emit('updateConversationList', AllConversations);
    }
    async handleGetGlobalUnreadCounts(data, client) {
        const userClient = client.handshake.auth.user;
        const counts = await this.roomService.getGlobalUnreadCounts(data.roomId, userClient.id);
        this.server.emit('globalUnreadCounts', counts);
        return counts;
    }
    async handleMarkAsRead(data, client) {
        const userClient = client.handshake.auth.user;
        const room = await this.roomService.findOne(data.roomId);
        await this.messageService.markMessagesAsRead(room.id, userClient.id);
        await this.resetUnreadCounter(userClient, room.id);
        this.server.to(`room_${data.roomId}`).emit('messagesRead', {
            roomId: room.id,
            readerId: userClient.id,
        });
        this.server.emit('requestRefreshUnreadCounts');
    }
    async handleRequestRefreshUnreadCounts(data, client) {
        const userClient = client.handshake.auth.user;
        const counts = await this.roomService.getGlobalUnreadCounts(data.roomId, userClient.id);
        this.server.emit('globalUnreadCounts', counts);
    }
    async resetUnreadCounter(user, roomId) {
        if (user.type_profil.slug === 'parent') {
            await this.roomService.resetUnreadCount(roomId, 'parent');
        }
        else if (user.type_profil.slug === 'nounu') {
            await this.roomService.resetUnreadCount(roomId, 'nounu');
        }
        else if (user.type_profil.slug === 'administrateur') {
            await this.roomService.resetUnreadCount(roomId, 'administrateur');
        }
    }
    async handleTyping(data, client) {
        const userClient = client.handshake.auth.user;
        const room = await this.roomService.findOne(data.roomId);
        if (!(await this.hasAccessToRoom(userClient.id, room))) {
            return;
        }
        client.broadcast.to(`room_${data.roomId}`).emit('userTyping', {
            userId: userClient.id,
            isTyping: data.isTyping,
        });
    }
    async hasAccessToRoom(userId, room) {
        const user = await this.userService.findOne(userId);
        return (user.type_profil.slug === 'administrateur' ||
            (user.type_profil.slug === 'parent' && room.parent.user.id === user.id) ||
            (user.type_profil.slug === 'nounu' && room.nounou.user.id === user.id));
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinRoom'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleJoinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessage'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('AllConversations'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "getConversationsForUser", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getGlobalUnreadCounts'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleGetGlobalUnreadCounts", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('markAsRead'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleMarkAsRead", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('requestRefreshUnreadCounts'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleRequestRefreshUnreadCounts", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('typing'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleTyping", null);
exports.ChatGateway = ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [rooms_service_1.RoomsService,
        messages_service_1.MessageService,
        user_service_1.UserService])
], ChatGateway);
