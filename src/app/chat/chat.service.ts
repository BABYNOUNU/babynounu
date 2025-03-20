import { BadGatewayException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, Not } from 'typeorm';
import { Message } from './models/message.model';
import { Rooms } from './models/rooms.model';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { CreateChatMessageDto } from './dto/create-chat.dto';

@Injectable()
export class ChatService {
  constructor(
    @Inject('MESSAGE_REPOSITORY')
    private messageRepository: Repository<Message>,
    @Inject('ROOMS_REPOSITORY')
    private roomsRepository: Repository<Rooms>,
  ) {}

  private Relations = [
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

  /**
   * Enregistre un nouveau message dans une conversation.
   */
  async saveMessage(
    createChatMessageDto: CreateChatMessageDto,
  ): Promise<Message> {
    const newMessage = this.messageRepository.create({
      room: { id: +createChatMessageDto.roomId },
      sender: { id: createChatMessageDto.senderId },
      content: createChatMessageDto.content,
    });

    const savedMessage = await this.messageRepository.save(newMessage);
    return this.getMessage(savedMessage.id);
  }

  /**
   * Récupère tous les messages d'une conversation spécifique.
   */
  async getMessages(roomId: number): Promise<Message[]> {
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

  /**
   * Récupère un message spécifique par son ID.
   */
  async getMessage(id: number): Promise<Message> {
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
      throw new NotFoundException('Message not found');
    }

    return message;
  }

  /**
   * Compte les messages non lus pour un utilisateur dans une conversation spécifique.
   */
  async getCountMessageByReceiverId(receiverId: string, roomId: number): Promise<number> {
    return await this.messageRepository.count({
      where: {
        room: { id: roomId },
        sender: { id: receiverId }, // Messages envoyés par l'autre utilisateur
        viewed: false,
      },
    });
  }

  /**
   * Marque les messages comme "lus" pour un utilisateur dans une conversation spécifique.
   */
  async updateViewMessage(receiverId: string, roomId: number): Promise<void> {
    await this.messageRepository.update(
      { room: { id: roomId }, sender: { id: Not(receiverId) }, viewed: false },
      { viewed: true },
    );
  }

  /**
   * Récupère une conversation spécifique avec ses messages.
   */
  async getConversation(roomId: number, openChatSenderId: string): Promise<any> {
    const conversation = await this.roomsRepository.findOne({
      where: { id: roomId },
      relations: this.Relations,
    });

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    await this.updateViewMessage(openChatSenderId, roomId);
    return this.formatReturnMessage(conversation);
  }

  /**
   * Récupère toutes les conversations avec le dernier message et le nombre de messages non lus.
   */
  async getAllConversationsByUser(userId: string): Promise<any[]> {
    const conversations = await this.roomsRepository.find({
      where: [{ sender: { id: userId } }, { receiver: { id: userId } }],
      relations: this.Relations,
    });

    const formattedConversations = await Promise.all(
      conversations.map(async (conversation) => {
        const lastMessage = await this.messageRepository.findOne({
          where: { room: { id: conversation.id } },
          order: { createdAt: 'DESC' },
        });

        const unreadCount = await this.getCountMessageByReceiverId(
          userId,
          conversation.id,
        );

        return {
          ...conversation,
          lastMessage: lastMessage || null,
          unreadCount,
        };
      }),
    );

    return formattedConversations.map((conversation) => ({
      ...conversation,
      ...this.formatReturnMessage(conversation),
      messages: null, // Ne pas inclure tous les messages pour optimiser les performances
    }));
  }

  /**
   * Crée une nouvelle conversation entre deux utilisateurs.
   */
  async createConversation(
    createConversationDto: CreateConversationDto,
  ): Promise<Rooms> {
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
      throw new BadGatewayException('Failed to create conversation');
    }

    return savedConversation;
  }


  /**
   * Renvoie les utilisateurs d'une conversation.
   */
  async getUsersInRoom(roomId: number): Promise<any[]> {
    const conversation = await this.roomsRepository.findOne({
      where: { id: roomId },
      relations: ['sender', 'receiver'],
    });

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    return [conversation.sender, conversation.receiver];
  }

  /**
   * Formate les données de retour pour une conversation.
   */
  private formatReturnMessage(conversation: any) {
    return {
      ...conversation,
      sender: {
        ...conversation.sender,
        profil:
          conversation.sender.nounu?.[0] || conversation.sender.parent?.[0],
        image: conversation.sender.medias?.find(
          (media) => media.type_media.slug === 'image-profil',
        ),
      },
      receiver: {
        ...conversation.receiver,
        profil:
          conversation.receiver.nounu?.[0] || conversation.receiver.parent?.[0],
        image: conversation.receiver.medias?.find(
          (media) => media.type_media.slug === 'image-profil',
        ),
      },
    };
  }
}