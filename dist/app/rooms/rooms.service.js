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
exports.RoomsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const unreadCount_model_1 = require("./models/unreadCount.model");
let RoomsService = class RoomsService {
    roomRepository;
    messageRepository;
    unreadCountRepository;
    constructor(roomRepository, messageRepository, unreadCountRepository) {
        this.roomRepository = roomRepository;
        this.messageRepository = messageRepository;
        this.unreadCountRepository = unreadCountRepository;
    }
    async getUserConversations(userId) {
        const rooms = await this.roomRepository.find({
            where: [{ receiver: { id: userId } }, { sender: { id: userId } }],
            relations: [
                'receiver',
                'sender',
                'nounou.user.medias.type_media',
                'parent.user.medias.type_media',
            ],
        });
        const conversations = await Promise.all(rooms.map(async (room) => {
            const lastMessage = await this.messageRepository.findOne({
                where: { room: { id: room.id } },
                order: { createdAt: 'DESC' },
            });
            const unreadCount = await this.unreadCountRepository.findOne({
                where: {
                    room: { id: room.id },
                    user: { id: userId },
                    count: (0, typeorm_1.MoreThan)(0),
                },
            });
            return {
                room,
                nounuPhoto: room.nounou.user.medias.length > 0
                    ? room.nounou.user.medias.find((media) => media.type_media.slug === 'image-profil')
                    : null,
                parentPhoto: room.parent.user.medias.length > 0
                    ? room.parent.user.medias.find((media) => media.type_media.slug === 'image-profil')
                    : null,
                lastMessage,
                unreadCount: unreadCount ? unreadCount.count : 0,
            };
        }));
        return conversations;
    }
    async createOrGetRoom(senderId, parentId, nounouId) {
        let receiverId = process.env.USER_ADMIN_ID;
        let room = await this.roomRepository.findOne({
            where: [{ nounou: { id: nounouId }, parent: { id: parentId } }],
            relations: [
                'nounou.user.medias.type_media',
                'parent.user.medias.type_media',
            ],
        });
        if (!room) {
            room = this.roomRepository.create({
                sender: { id: senderId },
                receiver: { id: process.env.USER_ADMIN_ID },
                parent: { id: parentId },
                nounou: { id: nounouId },
            });
            await this.roomRepository.save(room);
            await this.initializeUnreadCounts(room.id, senderId, receiverId);
        }
        return {
            ...room,
            photo: senderId == room.parent.user.id
                ? room.parent.user.medias?.find((media) => media.type_media.slug === 'image-profil')
                : room.nounou.user.medias?.find((media) => media.type_media.slug === 'image-profil'),
        };
    }
    async initializeUnreadCounts(roomId, user1Id, user2Id) {
        const count1 = this.unreadCountRepository.create({
            room: { id: roomId },
            user: { id: user1Id },
            count: 0,
        });
        const count2 = this.unreadCountRepository.create({
            room: { id: roomId },
            user: { id: user2Id },
            count: 0,
        });
        await this.unreadCountRepository.save([count1, count2]);
    }
    async getTotalUnreadCount(userId) {
        const result = await this.unreadCountRepository
            .createQueryBuilder('unread')
            .select('SUM(unread.count)', 'total')
            .where('unread.user.id = :userId', { userId })
            .getRawOne();
        return parseInt(result.total) || 0;
    }
    async incrementUnreadCount(roomId, userId) {
        await this.unreadCountRepository
            .createQueryBuilder()
            .update(unreadCount_model_1.RoomMessageCount)
            .set({ count: () => 'count + 1' })
            .where('room.id = :roomId AND user.id = :userId', { roomId, userId })
            .execute();
        return this.getRoomUnreadCount(roomId, userId);
    }
    async resetUnreadCount(roomId, userId) {
        await this.unreadCountRepository
            .createQueryBuilder()
            .update(unreadCount_model_1.RoomMessageCount)
            .set({ count: 0 })
            .where('room.id = :roomId AND user.id = :userId', { roomId, userId })
            .execute();
        return { roomId, userId, count: 0 };
    }
    async getRoom(roomId, senderId) {
        const room = await this.roomRepository.findOne({
            where: { id: roomId },
            relations: [
                'receiver',
                'sender',
                'nounou.user.medias.type_media',
                'parent.user.medias.type_media',
                'contract.message',
            ],
        });
        return {
            ...room,
            photo: senderId.id != room.parent.user.id
                ? room.parent.user.medias?.find((media) => media.type_media.slug === 'image-profil')
                : room.nounou.user.medias?.find((media) => media.type_media.slug === 'image-profil'),
        };
    }
    async getRoomUnreadCount(roomId, userId) {
        const unread = await this.unreadCountRepository.findOne({
            where: {
                room: { id: roomId },
                user: { id: userId },
            },
        });
        return unread ? unread.count : 0;
    }
};
exports.RoomsService = RoomsService;
exports.RoomsService = RoomsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ROOMS_REPOSITORY')),
    __param(1, (0, common_1.Inject)('MESSAGE_REPOSITORY')),
    __param(2, (0, common_1.Inject)('UNREAD_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], RoomsService);
