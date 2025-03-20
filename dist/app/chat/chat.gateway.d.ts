import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ChatService } from './chat.service';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly chatService;
    server: Server;
    constructor(chatService: ChatService);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    handleJoinRoom(roomId: string, client: Socket): Promise<void>;
    handleMessage(data: {
        senderId: string;
        content: string;
        roomId: string;
        receiverId?: string;
    }, client: Socket): Promise<void>;
    handleTyping(data: {
        sender: string;
        roomId: string;
    }, client: Socket): Promise<void>;
    getAllConversationByUser(userId: string, client: Socket): Promise<void>;
    getConversation(data: {
        roomId: number;
        openChatSenderId: string;
    }, client: Socket): Promise<void>;
    updateViewMessage(data: {
        roomId: string;
        receiverId: string;
    }, client: Socket): Promise<void>;
    getCountMessageByReceiverId(data: {
        roomId: string;
        receiverId: string;
    }, client: Socket): Promise<void>;
}
