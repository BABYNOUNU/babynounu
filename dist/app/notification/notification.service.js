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
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const notification_model_1 = require("./models/notification.model");
let NotificationService = class NotificationService {
    notificationRepository;
    constructor(notificationRepository) {
        this.notificationRepository = notificationRepository;
    }
    async createNotification(createNotificationDto) {
        const notification = this.notificationRepository.create({
            type: createNotificationDto.type,
            message: createNotificationDto.message,
            user: { id: createNotificationDto.userId },
            isRead: createNotificationDto.is_read,
            sender: { id: createNotificationDto.senderUserId },
            job: { id: createNotificationDto.jobId },
        });
        const saveNotification = await this.notificationRepository.save(notification);
        if (!saveNotification) {
            throw new common_1.NotFoundException('Notification not saved');
        }
        return saveNotification;
    }
    async getNotifications(userId) {
        let notifications = await this.notificationRepository.find({
            where: { sender: { id: userId } },
            relations: {
                user: {
                    nounu: true,
                    parent: true,
                },
                job: true,
            },
        });
        notifications = notifications.map((notify) => {
            return {
                ...notify,
                profil: notify.user.nounu.length > 0
                    ? notify.user.nounu[0]
                    : notify.user.parent[0],
            };
        })?.reverse();
        const count = await this.notificationRepository.count({
            where: { sender: { id: userId }, isRead: false },
        });
        return { notifications, count };
    }
    async markAsRead(notificationId) {
        await this.notificationRepository.update(notificationId, { isRead: true });
    }
    async updateViewByUserId(senderUserId) {
        await this.notificationRepository
            .createQueryBuilder('notification')
            .innerJoin('notification.sender', 'sender')
            .update(notification_model_1.Notification)
            .set({ isRead: true })
            .where('sender.id = :senderUserId', { senderUserId })
            .execute();
        return this.getNotifications(senderUserId);
    }
    async getAllCountByReceiverId(receiverId) {
        return await this.notificationRepository.count({
            where: {
                sender: { id: receiverId },
                user: { id: (0, typeorm_1.Not)(receiverId) },
                isRead: false,
            },
        });
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('NOTIFICATION_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], NotificationService);
