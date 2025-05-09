import { Server, Socket } from 'socket.io';
import { RoomsService } from '../rooms/rooms.service';
import { AuthService } from '../auth/auth.service';
import { MessageService } from '../messages/messages.service';
import { AbonnementService } from '../abonnement/abonnement.service';
import { NotificationService } from '../notification/notification.service';
export declare class ChatGateway {
    private readonly roomService;
    private readonly authService;
    private readonly messageService;
    private readonly abonnementService;
    private readonly notificationService;
    server: Server;
    private connectedUsers;
    private readonly connectionLock;
    constructor(roomService: RoomsService, authService: AuthService, messageService: MessageService, abonnementService: AbonnementService, notificationService: NotificationService);
    handleDisconnect(client: Socket): void;
    handleJoinRoom(client: Socket, roomId: number): Promise<{
        success: boolean;
        roomId: number;
    }>;
    handleLeaveRoom(client: Socket, roomId: number): Promise<{
        success: boolean;
    }>;
    handleSendMessage(client: Socket, data: {
        roomId: number;
        content: string;
        isProposition?: boolean;
        type?: 'Message' | 'Proposition';
        propositionExpired?: string;
    }): Promise<{
        success: boolean;
        message: import("../messages/models/message.model").Message;
    }>;
    private updateConversationList;
    handleSeenMessage(client: Socket, roomId: number): Promise<void>;
    handleTyping(client: Socket, data: {
        roomId: number;
        isTyping: boolean;
    }): Promise<void>;
    handleTypingStop(client: Socket, data: {
        roomId: number;
    }): Promise<void>;
    handleMarkAsRead(client: Socket, roomId: number): Promise<{
        success: boolean;
    }>;
    getTotalUnreadCount(client: Socket, userId: string): Promise<void>;
    notifyNewMessage(roomId: number, senderId: string): Promise<void>;
    GetNotifications(data: {
        userId: string;
    }, client: Socket): Promise<void>;
    markAsReadNotification(data: {
        notificationId: number;
        userId: string;
    }, client: Socket): Promise<void>;
    getUnreadCountsNotification(data: {
        userId: string;
    }, client: Socket): Promise<void>;
    IsAbonnement(data: {
        userId: string;
        transactionId: string;
    }, client: Socket): Promise<void>;
    checkPaymentPoint(data: {
        userId: string;
        transactionId: string;
        points: number;
    }, client: Socket): Promise<void>;
    isUserOnline(userId: string): boolean;
    getUserSocket(userId: string): Socket | undefined;
}
