import { Repository } from 'typeorm';
import { Message } from './models/message.model';
import { Rooms } from '../rooms/models/room.model';
import { NotificationService } from '../notification/notification.service';
import { ContractsService } from '../contracts/contracts.service';
export declare class MessageService {
    private messageRepository;
    private roomRepository;
    private readonly notificationService;
    private readonly contractService;
    constructor(messageRepository: Repository<Message>, roomRepository: Repository<Rooms>, notificationService: NotificationService, contractService: ContractsService);
    create({ content, roomId, senderId, isRead, isProposition, type, propositionExpired, }: {
        content: string;
        roomId: number;
        senderId: string;
        isRead: boolean;
        isProposition: boolean;
        type: 'Message' | 'Proposition';
        propositionExpired?: string;
    }): Promise<Message>;
    private sendPropositionNotification;
    findByRoom(roomId: number): Promise<Message[]>;
    markMessagesAsRead(roomId: number, userId: number): Promise<void>;
    getUnreadCountForUser(userId: number, role: 'parent' | 'nounou' | 'admin'): Promise<number>;
    getLastMessageForRoom(roomId: number): Promise<Message | null>;
    updateProposalStatus(roomId: number, messageId: number, status: 'Accepted' | 'Refused' | 'Pending'): Promise<any>;
}
