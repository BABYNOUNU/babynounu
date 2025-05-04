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
exports.MessageController = void 0;
const common_1 = require("@nestjs/common");
const messages_service_1 = require("./messages.service");
let MessageController = class MessageController {
    messageService;
    constructor(messageService) {
        this.messageService = messageService;
    }
    async createMessage(content, roomId, senderId, isRead) {
        return this.messageService.create({ content, roomId, senderId, isRead, isProposition: false, type: 'Message' });
    }
    async updateProposalStatus(roomId, messageId, status) {
        return this.messageService.updateProposalStatus(roomId, messageId, status);
    }
    async getMessagesByRoom(roomId) {
        return this.messageService.findByRoom(roomId);
    }
    async markMessagesAsRead(roomId, userId) {
        return this.messageService.markMessagesAsRead(roomId, userId);
    }
    async getUnreadCount(userId, role) {
        return this.messageService.getUnreadCountForUser(userId, role);
    }
    async getLastMessage(roomId) {
        return this.messageService.getLastMessageForRoom(roomId);
    }
};
exports.MessageController = MessageController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)('content')),
    __param(1, (0, common_1.Body)('roomId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)('senderId', common_1.ParseIntPipe)),
    __param(3, (0, common_1.Body)('isRead', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String, Boolean]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "createMessage", null);
__decorate([
    (0, common_1.Post)('proposal-status'),
    __param(0, (0, common_1.Body)('roomId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('messageId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "updateProposalStatus", null);
__decorate([
    (0, common_1.Get)('room/:roomId'),
    __param(0, (0, common_1.Param)('roomId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getMessagesByRoom", null);
__decorate([
    (0, common_1.Put)('read/:roomId'),
    __param(0, (0, common_1.Param)('roomId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "markMessagesAsRead", null);
__decorate([
    (0, common_1.Get)('unread-count'),
    __param(0, (0, common_1.Query)('userId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getUnreadCount", null);
__decorate([
    (0, common_1.Get)('last-message/:roomId'),
    __param(0, (0, common_1.Param)('roomId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getLastMessage", null);
exports.MessageController = MessageController = __decorate([
    (0, common_1.Controller)('messages'),
    __metadata("design:paramtypes", [messages_service_1.MessageService])
], MessageController);
