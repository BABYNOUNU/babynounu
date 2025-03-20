import { ChatService } from './chat.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { CreateChatMessageDto } from './dto/create-chat.dto';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    sendMessage(sendMessageDto: CreateChatMessageDto): Promise<import("./models/message.model").Message>;
    createConversation(createConversationDto: CreateConversationDto): Promise<import("./models/rooms.model").Rooms>;
    getConversation(room: number, openChatSenderId: string): Promise<any>;
    getConversationsByUser(userId: string): Promise<any[]>;
}
