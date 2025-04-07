// src/message/message.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './models/message.model';
import { Room } from '../rooms/models/room.model';

@Injectable()
export class MessageService {
  constructor(
    @Inject('MESSAGE_REPOSITORY')
    private messageRepository: Repository<Message>,
    @Inject('ROOMS_REPOSITORY')
    private roomRepository: Repository<Room>,
  ) {}

  async create({
    content,
    roomId,
    senderId,
  }: {
    content: string;
    roomId: number;
    senderId: number;
  }): Promise<Message> {
    const message = this.messageRepository.create({
      content,
      room: { id: roomId },
      sender: { id: senderId.toString() },
    });

    const savedMessage = await this.messageRepository.save(message);

    // Charger les relations pour le retour
    return this.messageRepository.findOne({
      where: { id: savedMessage.id },
      relations: ['sender', 'room'],
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
      .select('SUM(room.parentUnreadCount + room.nounouUnreadCount + room.adminUnreadCount)', 'total');

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
}