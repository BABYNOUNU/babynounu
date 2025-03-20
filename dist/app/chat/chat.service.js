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
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let ChatService = class ChatService {
    messageRepository;
    roomsRepository;
    constructor(messageRepository, roomsRepository) {
        this.messageRepository = messageRepository;
        this.roomsRepository = roomsRepository;
    }
    Relations = [
        'sender',
        'sender.nounu',
        'sender.parent',
        'sender.medias',
        'sender.medias.type_media',
        'receiver',
        'receiver.nounu',
        'receiver.medias',
        'receiver.parent',
        'receiver.medias.type_media',
        'messages',
    ];
    async saveMessage(createChatMessageDto) {
        const newMessage = this.messageRepository.create({
            room: { id: +createChatMessageDto.roomId },
            sender: { id: createChatMessageDto.senderId },
            content: createChatMessageDto.content,
        });
        const savedMessage = await this.messageRepository.save(newMessage);
        return this.getMessage(savedMessage.id);
    }
    async getMessages(roomId) {
        console.log('roomId : ', roomId);
        return await this.messageRepository.find({
            where: { room: { id: roomId } },
            order: { createdAt: 'ASC' },
            relations: [
                'sender',
                'sender.nounu',
                'sender.parent',
                'sender.medias',
                'sender.medias.type_media',
            ],
        });
    }
    async getMessage(id) {
        const message = await this.messageRepository.findOne({
            where: { id },
            relations: [
                'sender',
                'sender.nounu',
                'sender.parent',
                'sender.medias',
                'sender.medias.type_media',
                'room',
            ],
        });
        if (!message) {
            throw new common_1.NotFoundException('Message not found');
        }
        return message;
    }
    async getCountMessageByReceiverId(receiverId, roomId) {
        return await this.messageRepository.count({
            where: {
                room: { id: roomId },
                sender: { id: receiverId },
                viewed: false,
            },
        });
    }
    async updateViewMessage(receiverId, roomId) {
        await this.messageRepository.update({ room: { id: roomId }, sender: { id: (0, typeorm_1.Not)(receiverId) }, viewed: false }, { viewed: true });
    }
    async getConversation(roomId, openChatSenderId) {
        const conversation = await this.roomsRepository.findOne({
            where: { id: roomId },
            relations: this.Relations,
        });
        if (!conversation) {
            throw new common_1.NotFoundException('Conversation not found');
        }
        await this.updateViewMessage(openChatSenderId, roomId);
        return this.formatReturnMessage(conversation);
    }
    async getAllConversationsByUser(userId) {
        const conversations = await this.roomsRepository.find({
            where: [{ sender: { id: userId } }, { receiver: { id: userId } }],
            relations: this.Relations,
        });
        const formattedConversations = await Promise.all(conversations.map(async (conversation) => {
            const lastMessage = await this.messageRepository.findOne({
                where: { room: { id: conversation.id } },
                order: { createdAt: 'DESC' },
            });
            const unreadCount = await this.getCountMessageByReceiverId(userId, conversation.id);
            return {
                ...conversation,
                lastMessage: lastMessage || null,
                unreadCount,
            };
        }));
        return formattedConversations.map((conversation) => ({
            ...conversation,
            ...this.formatReturnMessage(conversation),
            messages: null,
        }));
    }
    async createConversation(createConversationDto) {
        const { sender, receiver } = createConversationDto;
        const existingConversation = await this.roomsRepository.findOne({
            where: [
                { sender: { id: sender }, receiver: { id: receiver } },
                { sender: { id: receiver }, receiver: { id: sender } },
            ],
        });
        if (existingConversation) {
            return existingConversation;
        }
        const newConversation = this.roomsRepository.create({
            sender: { id: sender },
            receiver: { id: receiver },
        });
        const savedConversation = await this.roomsRepository.save(newConversation);
        if (!savedConversation) {
            throw new common_1.BadGatewayException('Failed to create conversation');
        }
        return savedConversation;
    }
    async getUsersInRoom(roomId) {
        const conversation = await this.roomsRepository.findOne({
            where: { id: roomId },
            relations: ['sender', 'receiver'],
        });
        if (!conversation) {
            throw new common_1.NotFoundException('Conversation not found');
        }
        return [conversation.sender, conversation.receiver];
    }
    formatReturnMessage(conversation) {
        return {
            ...conversation,
            sender: {
                ...conversation.sender,
                profil: conversation.sender.nounu?.[0] || conversation.sender.parent?.[0],
                image: conversation.sender.medias?.find((media) => media.type_media.slug === 'image-profil'),
            },
            receiver: {
                ...conversation.receiver,
                profil: conversation.receiver.nounu?.[0] || conversation.receiver.parent?.[0],
                image: conversation.receiver.medias?.find((media) => media.type_media.slug === 'image-profil'),
            },
        };
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('MESSAGE_REPOSITORY')),
    __param(1, (0, common_1.Inject)('ROOMS_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], ChatService);
