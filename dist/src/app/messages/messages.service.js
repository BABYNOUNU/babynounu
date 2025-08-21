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
const notification_service_1 = require("../notification/notification.service");
const contracts_service_1 = require("../contracts/contracts.service");
let MessageService = class MessageService {
    messageRepository;
    roomRepository;
    notificationService;
    contractService;
    constructor(messageRepository, roomRepository, notificationService, contractService) {
        this.messageRepository = messageRepository;
        this.roomRepository = roomRepository;
        this.notificationService = notificationService;
        this.contractService = contractService;
    }
    async create({ content, roomId, senderId, isRead, isProposition, type, propositionExpired, }) {
        const message = this.messageRepository.create({
            content,
            room: { id: roomId },
            sender: { id: senderId },
            isRead: isRead,
            isProposition: isProposition,
            type: type,
            propositionExpired: propositionExpired,
        });
        const savedMessage = await this.messageRepository.save(message);
        const getMessage = await this.messageRepository.findOne({
            where: { id: savedMessage.id },
            relations: ['sender', 'room.parent.user', 'room.nounou.user', 'contract'],
        });
        const ToSenderId = getMessage.sender.id == senderId
            ? getMessage.room.nounou
            : getMessage.room.parent;
        const ToReceiverId = getMessage.sender.id == senderId
            ? getMessage.room.parent
            : getMessage.room.nounou;
        if (type === 'Proposition') {
            await this.sendPropositionNotification(ToSenderId, ToReceiverId, getMessage);
        }
        return getMessage;
    }
    async sendPropositionNotification(userId, senderUserId, Message) {
        await this.notificationService.createNotification({
            type: 'PROPOSITION',
            userId: userId.user.id,
            message: `Nouvelle proposition de <span class="font-bold">${userId.fullname}</span> vous avez échanger recenement. Missions: pour une durée de ${JSON.parse(Message.content).duration} jours et une rénumeration de ${JSON.parse(Message.content).price} Fcfa`,
            is_read: false,
            senderUserId: senderUserId.user.id,
            tolinkId: Message.room.id
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
    async updateProposalStatus(roomId, messageId, status) {
        console.log(roomId, messageId, status);
        const message = await this.messageRepository.update({
            id: messageId
        }, {
            room: { id: roomId },
            proposalStatus: status,
        });
        if (!message) {
            throw new common_1.NotFoundException(`Message with ID ${messageId} not found`);
        }
        const contract = await this.contractService.create({
            messageId,
            roomId,
        });
        return contract;
    }
};
exports.MessageService = MessageService;
exports.MessageService = MessageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('MESSAGE_REPOSITORY')),
    __param(1, (0, common_1.Inject)('ROOMS_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        notification_service_1.NotificationService,
        contracts_service_1.ContractsService])
], MessageService);
