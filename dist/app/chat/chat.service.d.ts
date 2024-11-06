import { Repository } from 'typeorm';
import { ChatMessages } from './models/chat.model';
export declare class ChatService {
    private messageRepository;
    constructor(messageRepository: Repository<ChatMessages>);
    saveMessage(sender: string, content: string, room: string): Promise<ChatMessages>;
    getMessages(room: string): Promise<ChatMessages[]>;
}
