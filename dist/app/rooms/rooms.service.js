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
        if (!userId) {
            throw new common_1.BadRequestException('User ID is required');
        }
        try {
            const rooms = await this.roomRepository.find({
                where: [{ receiver: { id: userId } }, { sender: { id: userId } }],
                relations: [
                    'receiver',
                    'sender',
                    'nounou.user.medias.type_media',
                    'parent.user.medias.type_media',
                ],
            });
            if (!rooms.length) {
                return [];
            }
            const conversations = await Promise.all(rooms.map(async (room) => {
                const [lastMessage, unreadCount] = await Promise.all([
                    this.messageRepository.findOne({
                        where: { room: { id: room.id } },
                        order: { createdAt: 'DESC' },
                    }),
                    this.unreadCountRepository.findOne({
                        where: {
                            room: { id: room.id },
                            user: { id: userId },
                            count: (0, typeorm_1.MoreThan)(0),
                        },
                    })
                ]);
                return {
                    room,
                    nounuPhoto: this.extractProfilePhoto(room.nounou?.user?.medias),
                    parentPhoto: this.extractProfilePhoto(room.parent?.user?.medias),
                    lastMessage,
                    unreadCount: unreadCount?.count || 0,
                };
            }));
            return conversations;
        }
        catch (error) {
            throw new Error(`Failed to get user conversations: ${error.message}`);
        }
    }
    extractProfilePhoto(medias) {
        if (!medias || !Array.isArray(medias) || medias.length === 0) {
            return null;
        }
        return medias.find((media) => media?.type_media?.slug === 'image-profil') || null;
    }
    async createOrGetRoom(senderId, parentId, nounouId) {
        if (!senderId || !parentId || !nounouId) {
            throw new common_1.BadRequestException('Sender ID, Parent ID, and Nounou ID are required');
        }
        if (!process.env.USER_ADMIN_ID) {
            throw new Error('USER_ADMIN_ID environment variable is not configured');
        }
        try {
            let room = await this.roomRepository.findOne({
                where: { nounou: { id: nounouId }, parent: { id: parentId } },
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
                room = await this.roomRepository.save(room);
            }
            return {
                ...room,
                photo: null,
            };
        }
        catch (error) {
            throw new Error(`Failed to create or get room: ${error.message}`);
        }
    }
    getConversationPhoto(senderId, room) {
        if (senderId === room.parent?.user?.id) {
            return this.extractProfilePhoto(room.parent?.user?.medias);
        }
        return this.extractProfilePhoto(room.nounou?.user?.medias);
    }
    async initializeUnreadCounts(roomId, user1Id, user2Id) {
        try {
            const counts = [
                this.unreadCountRepository.create({
                    room: { id: roomId },
                    user: { id: user1Id },
                    count: 0,
                }),
                this.unreadCountRepository.create({
                    room: { id: roomId },
                    user: { id: user2Id },
                    count: 0,
                })
            ];
            await this.unreadCountRepository.save(counts);
        }
        catch (error) {
            throw new Error(`Failed to initialize unread counts: ${error.message}`);
        }
    }
    async getTotalUnreadCount(userId) {
        if (!userId) {
            throw new common_1.BadRequestException('User ID is required');
        }
        try {
            const result = await this.unreadCountRepository
                .createQueryBuilder('unread')
                .select('COALESCE(SUM(unread.count), 0)', 'total')
                .where('unread.user.id = :userId', { userId })
                .getRawOne();
            return parseInt(result.total, 10) || 0;
        }
        catch (error) {
            throw new Error(`Failed to get total unread count: ${error.message}`);
        }
    }
    async incrementUnreadCount(roomId, userId) {
        if (!roomId || !userId) {
            throw new common_1.BadRequestException('Room ID and User ID are required');
        }
        try {
            await this.unreadCountRepository
                .createQueryBuilder()
                .update(unreadCount_model_1.RoomMessageCount)
                .set({ count: () => 'count + 1' })
                .where('room.id = :roomId AND user.id = :userId', { roomId, userId })
                .execute();
            return this.getRoomUnreadCount(roomId, userId);
        }
        catch (error) {
            throw new Error(`Failed to increment unread count: ${error.message}`);
        }
    }
    async resetUnreadCount(roomId, userId) {
        if (!roomId || !userId) {
            throw new common_1.BadRequestException('Room ID and User ID are required');
        }
        try {
            await this.unreadCountRepository
                .createQueryBuilder()
                .update(unreadCount_model_1.RoomMessageCount)
                .set({ count: 0 })
                .where('room.id = :roomId AND user.id = :userId', { roomId, userId })
                .execute();
            return { roomId, userId, count: 0 };
        }
        catch (error) {
            throw new Error(`Failed to reset unread count: ${error.message}`);
        }
    }
    async getRoom(roomId, senderId) {
        if (!roomId) {
            throw new common_1.BadRequestException('Room ID is required');
        }
        try {
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
            if (!room) {
                throw new common_1.NotFoundException(`Room with ID ${roomId} not found`);
            }
            return {
                ...room,
                photo: senderId?.id !== room.parent?.user?.id
                    ? this.extractProfilePhoto(room.parent?.user?.medias)
                    : this.extractProfilePhoto(room.nounou?.user?.medias),
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new Error(`Failed to get room: ${error.message}`);
        }
    }
    async getRoomUnreadCount(roomId, userId) {
        if (!roomId || !userId) {
            throw new common_1.BadRequestException('Room ID and User ID are required');
        }
        try {
            const unread = await this.unreadCountRepository.findOne({
                where: {
                    room: { id: roomId },
                    user: { id: userId },
                },
            });
            return unread?.count || 0;
        }
        catch (error) {
            throw new Error(`Failed to get room unread count: ${error.message}`);
        }
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
