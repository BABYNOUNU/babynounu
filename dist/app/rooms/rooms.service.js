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
const user_service_1 = require("../user/user.service");
let RoomsService = class RoomsService {
    roomRepository;
    userService;
    constructor(roomRepository, userService) {
        this.roomRepository = roomRepository;
        this.userService = userService;
    }
    async findOne(id) {
        const getRoom = await this.roomRepository.findOne({
            where: { id },
            relations: {
                nounou: { user: { medias: { type_media: true } } },
                parent: { user: { medias: { type_media: true } } },
            },
        });
        let photo;
        if (getRoom) {
            getRoom.photo = getRoom[getRoom.nounou?.id ? 'nounou' : 'parent'].user.medias.find((uk) => uk.type_media.slug == 'image-profil');
        }
        return getRoom;
    }
    async findOrCreate(parentId, nounouId) {
        let room = await this.roomRepository.findOne({
            where: { parent: { id: parentId }, nounou: { id: nounouId } },
        });
        if (!room) {
            room = this.roomRepository.create({
                parent: { id: parentId },
                nounou: { id: nounouId },
            });
            await this.roomRepository.save(room);
        }
        return {
            ...room
        };
    }
    async incrementUnreadCount(roomId, role) {
        const field = `${role}UnreadCount`;
        await this.roomRepository.increment({ id: roomId }, field, 1);
    }
    async resetUnreadCount(roomId, role) {
        const field = `${role}UnreadCount`;
        await this.roomRepository.update(roomId, { [field]: 0 });
    }
    async getConversationsForUser(userId) {
        const user = await this.userService.findOne(userId);
        let rooms;
        if (user.type_profil.slug === 'administrateur') {
            rooms = await this.roomRepository.find({
                relations: {
                    parent: { user: { medias: { type_media: true } }, contracts: true },
                    nounou: { user: { medias: { type_media: true } } },
                    messages: true,
                },
            });
        }
        else if (user.type_profil.slug === 'parent') {
            rooms = await this.roomRepository.find({
                where: { parent: { user: { id: user.id } } },
                relations: {
                    nounou: { user: { medias: { type_media: true } } },
                    messages: true,
                },
            });
        }
        else if (user.type_profil.slug === 'nounou') {
            rooms = await this.roomRepository.find({
                where: { nounou: { user: { id: user.id.toString() } } },
                relations: {
                    parent: { user: { medias: { type_media: true } } },
                    messages: true,
                },
            });
        }
        else {
            return [];
        }
        return rooms.map((room) => {
            const lastMessage = room.messages?.length > 0
                ? room.messages.sort((a, b) => new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime())[0]
                : null;
            return {
                ...room,
                photo: room['nounou'].user.medias.find((uk) => uk.type_media.slug == 'image-profil'),
                photoParent: room['parent'] ? room['parent'].user.medias.find((uk) => uk.type_media.slug == 'image-profil') : null,
                lastMessage: lastMessage
                    ? {
                        content: lastMessage.content,
                        createdAt: lastMessage.createdAt,
                        isRead: lastMessage.isRead,
                    }
                    : null,
            };
        }).reverse();
    }
    async getGlobalUnreadCounts(roomId, userId) {
        const rooms = await this.roomRepository.find({
            where: [
                { parent: { user: { id: userId } } },
                { nounou: { user: { id: (0, typeorm_1.Not)(userId) } } },
            ],
            relations: { parent: { user: true }, nounou: { user: true } }
        });
        let parentUnread = 0;
        let nounouUnread = 0;
        let adminUnread = 0;
        rooms.forEach((room) => {
            parentUnread += room.parentUnreadCount;
            nounouUnread += room.nounuUnreadCount;
            adminUnread += room.administrateurUnreadCount;
        });
        return { parentUnread, nounouUnread, adminUnread };
    }
};
exports.RoomsService = RoomsService;
exports.RoomsService = RoomsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ROOMS_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        user_service_1.UserService])
], RoomsService);
