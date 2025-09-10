// src/app/messages/messages.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './models/message.model';
import { Rooms } from '../rooms/models/room.model';
import { NotificationService } from '../notification/notification.service';
import { ContractsService } from '../contracts/contracts.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(Rooms)
    private roomRepository: Repository<Rooms>,
    private readonly notificationService: NotificationService,
    private readonly contractService: ContractsService,
  ) {}

  async create({
    content,
    roomId,
    senderId,
    isRead,
    isProposition,
    type,
    propositionExpired,
  }: {
    content: string;
    roomId: number;
    senderId: string;
    isRead: boolean;
    isProposition: boolean;
    type: 'Message' | 'Proposition';
    propositionExpired?: string;
  }): Promise<Message> {
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

    // Charger les relations pour le retour
    const getMessage = await this.messageRepository.findOne({
      where: { id: savedMessage.id },
      relations: ['sender', 'room.parent.user', 'room.nounou.user', 'contract'],
    });

    // Verifier si le type est une proposition et envoyer une notification
    const ToSenderId =
      getMessage.sender.id == senderId
        ? getMessage.room.nounou
        : getMessage.room.parent;
    const ToReceiverId =
      getMessage.sender.id == senderId
        ? getMessage.room.parent
        : getMessage.room.nounou;

    if (type === 'Proposition') {
      await this.sendPropositionNotification(ToSenderId, ToReceiverId, getMessage);
    }

    return getMessage;
  }

  /**
   * Envoie une notification à un utilisateur pour une nouvelle proposition.
   */
  private async sendPropositionNotification(
    userId: any,
    senderUserId: any,
    Message: any
  ): Promise<void> {
    await this.notificationService.createNotification({
      type: 'PROPOSITION',
      userId: userId.user.id,
      message: `Nouvelle proposition de <span class="font-bold">${userId.fullname}</span> vous avez échanger recenement. Missions: pour une durée de ${JSON.parse(Message.content).duration} jours et une rénumeration de ${JSON.parse(Message.content).price} Fcfa`,
      is_read: false,
      senderUserId: senderUserId.user.id,
      tolinkId: Message.room.id
    });
  }

  async findByRoom(roomId: number): Promise<Message[]> {
    return this.messageRepository.find({
      where: { room: { id: roomId } },
      relations: ['sender'],
      order: { createdAt: 'ASC' },
    });
  }

  async markMessagesAsRead(roomId: number, userId: number): Promise<void> {
    await this.messageRepository
      .createQueryBuilder()
      .update(Message)
      .set({ isRead: true })
      .where('roomId = :roomId', { roomId })
      .andWhere('senderId != :userId', { userId })
      .andWhere('isRead = false')
      .execute();
  }

  async getUnreadCountForUser(
    userId: number,
    role: 'parent' | 'nounou' | 'admin',
  ): Promise<number> {
    const query = this.roomRepository
      .createQueryBuilder('room')
      .select(
        'SUM(room.parentUnreadCount + room.nounouUnreadCount + room.adminUnreadCount)',
        'total',
      );

    if (role === 'parent') {
      query.where('room.parentId = :userId', { userId });
      query.select('SUM(room.parentUnreadCount)', 'total');
    } else if (role === 'nounou') {
      query.where('room.nounouId = :userId', { userId });
      query.select('SUM(room.nounouUnreadCount)', 'total');
    } else if (role === 'admin') {
      query.select('SUM(room.adminUnreadCount)', 'total');
    }

    const result = await query.getRawOne();
    return parseInt(result.total) || 0;
  }

  async getLastMessageForRoom(roomId: number): Promise<Message | null> {
    return this.messageRepository.findOne({
      where: { room: { id: roomId } },
      order: { createdAt: 'DESC' },
      relations: ['sender'],
    });
  }

  async updateProposalStatus(
    roomId: number,
    messageId: number,
    status: 'Accepted' | 'Refused' | 'Pending',
  ): Promise<any> {
    console.log(roomId, messageId, status);
    const message = await this.messageRepository.update({
      id: messageId},{
      room: { id: roomId },
      proposalStatus: status,
    });

    if (!message) {
      throw new NotFoundException(`Message with ID ${messageId} not found`);
    }

    const contract = await this.contractService.create({
      messageId,
      roomId,
    });

    return contract;
  }
}
