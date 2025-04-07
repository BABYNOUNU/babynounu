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
const rooms_service_1 = require("../rooms/rooms.service");
const messages_service_1 = require("../messages/messages.service");
let ChatController = class ChatController {
    roomService;
    messageService;
    constructor(roomService, messageService) {
        this.roomService = roomService;
        this.messageService = messageService;
    }
    async getConversations(userId) {
        return this.roomService.getConversationsForUser(userId);
    }
    async getMessages(roomId) {
        return this.messageService.findByRoom(roomId);
    }
    async findOrCreateRoom(parentId, nounouId) {
        return this.roomService.findOrCreate(parentId, nounouId);
    }
    async findOne(id) {
        return this.roomService.findOne(id);
    }
};
exports.ChatController = ChatController;
__decorate([
    (0, common_1.Get)('conversations'),
    __param(0, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getConversations", null);
__decorate([
    (0, common_1.Get)('messages'),
    __param(0, (0, common_1.Query)('roomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getMessages", null);
__decorate([
    (0, common_1.Get)('find-or-create-room'),
    __param(0, (0, common_1.Query)('parentId')),
    __param(1, (0, common_1.Query)('nounouId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "findOrCreateRoom", null);
__decorate([
    (0, common_1.Get)('room/:id'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "findOne", null);
exports.ChatController = ChatController = __decorate([
    (0, common_1.Controller)('chat'),
    (0, common_1.UseGuards)(auh_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [rooms_service_1.RoomsService,
        messages_service_1.MessageService])
], ChatController);
