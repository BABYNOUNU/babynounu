import { ChatService } from './chat.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    sendMessage(sendMessageDto: CreateConversationDto): Promise<import("./models/chat.model").ChatMessages>;
    getChatHistory(conversationId: string): Promise<import("./models/chat.model").ChatMessages[]>;
    listConversations(): Promise<string[]>;
}
