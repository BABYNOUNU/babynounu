import { Repository } from 'typeorm';
import { Message } from './models/message.model';
import { Room } from '../rooms/models/room.model';
export declare class MessageService {
    private messageRepository;
    private roomRepository;
    constructor(messageRepository: Repository<Message>, roomRepository: Repository<Room>);
    create({ content, roomId, senderId, }: {
        content: string;
        roomId: number;
        senderId: number;
    }): Promise<Message>;
    findByRoom(roomId: number): Promise<Message[]>;
    markMessagesAsRead(roomId: number, userId: number): Promise<void>;
    getUnreadCountForUser(userId: number, role: 'parent' | 'nounou' | 'admin'): Promise<number>;
    getLastMessageForRoom(roomId: number): Promise<Message | null>;
}
