import { Repository } from 'typeorm';
import { ChatMessages } from './models/chat.model';
import { CreateConversationDto } from './dto/create-conversation.dto';
export declare class ChatService {
    private messageRepository;
    constructor(messageRepository: Repository<ChatMessages>);
    saveMessage(sendMessageDto: CreateConversationDto): Promise<ChatMessages>;
    getMessages(room: string): Promise<ChatMessages[]>;
    listRooms(): Promise<string[]>;
}
