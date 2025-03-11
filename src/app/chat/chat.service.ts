import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ChatMessages } from './models/chat.model';
import { CreateConversationDto } from './dto/create-conversation.dto';

@Injectable()
export class ChatService {
  constructor(
    @Inject('CHAT_REPOSITORY')
    private messageRepository: Repository<ChatMessages>,
  ) {}

  async saveMessage(sendMessageDto: CreateConversationDto): Promise<ChatMessages> {
    const message = this.messageRepository.create({});
    return this.messageRepository.save(message);
  }

  async getMessages(room: string): Promise<ChatMessages[]> {
    return this.messageRepository.find({ where: { room }, order: { createdAt: 'ASC' } });
  }

  
  async listRooms(): Promise<string[]> {
    return this.messageRepository.createQueryBuilder('chat')
      .select('DISTINCT chat.room')
      .getRawMany()
      .then(data => data.map(x => x.room));
  }
}
