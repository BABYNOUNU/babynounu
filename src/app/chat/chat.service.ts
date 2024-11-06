import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ChatMessages } from './models/chat.model';

@Injectable()
export class ChatService {
  constructor(
    @Inject('CHAT_REPOSITORY')
    private messageRepository: Repository<ChatMessages>,
  ) {}

  async saveMessage(sender: string, content: string, room: string): Promise<ChatMessages> {
    const message = this.messageRepository.create({ sender, content, room });
    return this.messageRepository.save(message);
  }

  async getMessages(room: string): Promise<ChatMessages[]> {
    return this.messageRepository.find({ where: { room }, order: { createdAt: 'ASC' } });
  }
}
