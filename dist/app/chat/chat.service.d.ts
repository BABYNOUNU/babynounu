import { Repository } from 'typeorm';
import { Message } from './models/message.model';
import { Rooms } from './models/rooms.model';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { CreateChatMessageDto } from './dto/create-chat.dto';
export declare class ChatService {
    private messageRepository;
    private roomsRepository;
    constructor(messageRepository: Repository<Message>, roomsRepository: Repository<Rooms>);
    private Relations;
    saveMessage(createChatMessageDto: CreateChatMessageDto): Promise<Message>;
    getMessages(roomId: number): Promise<Message[]>;
    getMessage(id: number): Promise<Message>;
    getCountMessageByReceiverId(receiverId: string, roomId: number): Promise<number>;
    updateViewMessage(receiverId: string, roomId: number): Promise<void>;
    getConversation(roomId: number, openChatSenderId: string): Promise<any>;
    getAllConversationsByUser(userId: string): Promise<any[]>;
    createConversation(createConversationDto: CreateConversationDto): Promise<Rooms>;
    getUsersInRoom(roomId: number): Promise<any[]>;
    private formatReturnMessage;
}
