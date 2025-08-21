import { MessageService } from './messages.service';
import { Message } from './models/message.model';
export declare class MessageController {
    private readonly messageService;
    constructor(messageService: MessageService);
    createMessage(content: string, roomId: number, senderId: string, isRead: boolean): Promise<Message>;
    updateProposalStatus(roomId: number, messageId: number, status: 'Accepted' | 'Refused' | 'Pending'): Promise<void>;
    getMessagesByRoom(roomId: number): Promise<Message[]>;
    markMessagesAsRead(roomId: number, userId: number): Promise<void>;
    getUnreadCount(userId: number, role: 'parent' | 'nounou' | 'admin'): Promise<number>;
    getLastMessage(roomId: number): Promise<Message | null>;
}
