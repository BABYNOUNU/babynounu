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
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const auh_guard_1 = require("../auth/auh.guard");
const user_model_1 = require("../user/user.model");
const messages_service_1 = require("../messages/messages.service");
const getUser_1 = require("../auth/getUser");
const rooms_service_1 = require("../rooms/rooms.service");
let ChatController = class ChatController {
    roomService;
    messageService;
    constructor(roomService, messageService) {
        this.roomService = roomService;
        this.messageService = messageService;
    }
    async getMessages(roomId) {
        return this.messageService.findByRoom(roomId);
    }
    async getUserConversations(user) {
        console.log(user);
        return this.roomService.getUserConversations(user.id);
    }
    async createOrGetRoom(user, nounouId, parentId) {
        return this.roomService.createOrGetRoom(user.id, parentId, nounouId);
    }
    async getTotalUnreadCount(user) {
        return this.roomService.getTotalUnreadCount(user.id);
    }
    async getRoom(user, roomId) {
        return this.roomService.getRoom(roomId, user.id);
    }
    async getRoomUnreadCount(roomId, user) {
        return this.roomService.getRoomUnreadCount(roomId, user.id);
    }
    async markAsRead(roomId, user) {
        return this.roomService.resetUnreadCount(roomId, user.id);
    }
};
exports.ChatController = ChatController;
__decorate([
    (0, common_1.Get)('messages'),
    __param(0, (0, common_1.Query)('roomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getMessages", null);
__decorate([
    (0, common_1.Get)('conversations'),
    __param(0, (0, getUser_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getUserConversations", null);
__decorate([
    (0, common_1.Get)('find-or-create-room'),
    __param(0, (0, getUser_1.GetUser)()),
    __param(1, (0, common_1.Query)('nounouId')),
    __param(2, (0, common_1.Query)('parentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User, String, String]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "createOrGetRoom", null);
__decorate([
    (0, common_1.Get)('unread-total'),
    __param(0, (0, getUser_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getTotalUnreadCount", null);
__decorate([
    (0, common_1.Get)('room/:id'),
    __param(0, (0, getUser_1.GetUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User, Number]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getRoom", null);
__decorate([
    (0, common_1.Get)(':id/unread'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, getUser_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_model_1.User]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getRoomUnreadCount", null);
__decorate([
    (0, common_1.Post)(':id/mark-as-read'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, getUser_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_model_1.User]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "markAsRead", null);
exports.ChatController = ChatController = __decorate([
    (0, common_1.Controller)('chat'),
    (0, common_1.UseGuards)(auh_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [rooms_service_1.RoomsService,
        messages_service_1.MessageService])
], ChatController);
