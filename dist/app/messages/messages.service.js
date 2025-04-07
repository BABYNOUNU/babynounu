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
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const message_model_1 = require("./models/message.model");
let MessageService = class MessageService {
    messageRepository;
    roomRepository;
    constructor(messageRepository, roomRepository) {
        this.messageRepository = messageRepository;
        this.roomRepository = roomRepository;
    }
    async create({ content, roomId, senderId, }) {
        const message = this.messageRepository.create({
            content,
            room: { id: roomId },
            sender: { id: senderId.toString() },
        });
        const savedMessage = await this.messageRepository.save(message);
        return this.messageRepository.findOne({
            where: { id: savedMessage.id },
            relations: ['sender', 'room'],
        });
    }
    async findByRoom(roomId) {
        return this.messageRepository.find({
            where: { room: { id: roomId } },
            relations: ['sender'],
            order: { createdAt: 'ASC' },
        });
    }
    async markMessagesAsRead(roomId, userId) {
        await this.messageRepository
            .createQueryBuilder()
            .update(message_model_1.Message)
            .set({ isRead: true })
            .where('roomId = :roomId', { roomId })
            .andWhere('senderId != :userId', { userId })
            .andWhere('isRead = false')
            .execute();
    }
    async getUnreadCountForUser(userId, role) {
        const query = this.roomRepository
            .createQueryBuilder('room')
            .select('SUM(room.parentUnreadCount + room.nounouUnreadCount + room.adminUnreadCount)', 'total');
        if (role === 'parent') {
            query.where('room.parentId = :userId', { userId });
            query.select('SUM(room.parentUnreadCount)', 'total');
        }
        else if (role === 'nounou') {
            query.where('room.nounouId = :userId', { userId });
            query.select('SUM(room.nounouUnreadCount)', 'total');
        }
        else if (role === 'admin') {
            query.select('SUM(room.adminUnreadCount)', 'total');
        }
        const result = await query.getRawOne();
        return parseInt(result.total) || 0;
    }
    async getLastMessageForRoom(roomId) {
        return this.messageRepository.findOne({
            where: { room: { id: roomId } },
            order: { createdAt: 'DESC' },
            relations: ['sender'],
        });
    }
};
exports.MessageService = MessageService;
exports.MessageService = MessageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('MESSAGE_REPOSITORY')),
    __param(1, (0, common_1.Inject)('ROOMS_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], MessageService);
