import { Socket, Server } from 'socket.io';
import { RoomsService } from '../rooms/rooms.service';
import { MessageService } from '../messages/messages.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';
export declare class ChatGateway {
    private readonly roomService;
    private readonly messageService;
    private readonly userService;
    server: Server;
    constructor(roomService: RoomsService, messageService: MessageService, userService: UserService);
    handleJoinRoom(data: {
        roomId: number;
    }, client: Socket): Promise<void>;
    handleMessage(data: {
        roomId: number;
        content: string;
        toSender?: any;
    }, client: any): Promise<void>;
    private updateUnreadCounters;
    private handleUserNotifications;
    getConversationsForUser(client: any): Promise<void>;
    handleGetGlobalUnreadCounts(data: {
        roomId: number;
    }, client: any): Promise<{
        parentUnread: number;
        nounouUnread: number;
        adminUnread: number;
    }>;
    handleMarkAsRead(data: {
        roomId: number;
    }, client: any): Promise<void>;
    handleRequestRefreshUnreadCounts(data: {
        roomId: number;
    }, client: any): Promise<void>;
    private resetUnreadCounter;
    handleTyping(data: {
        roomId: number;
        isTyping: boolean;
    }, client: Socket & {
        user: User;
    }): Promise<void>;
    private hasAccessToRoom;
}
