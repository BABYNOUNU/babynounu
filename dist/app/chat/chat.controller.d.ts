import { RoomsService } from '../rooms/rooms.service';
import { MessageService } from '../messages/messages.service';
export declare class ChatController {
    private roomService;
    private messageService;
    constructor(roomService: RoomsService, messageService: MessageService);
    getConversations(userId: string): Promise<any[]>;
    getMessages(roomId: number): Promise<import("../messages/models/message.model").Message[]>;
    findOrCreateRoom(parentId: number, nounouId: number): Promise<import("../rooms/models/room.model").Room>;
    findOne(id: number): Promise<import("../rooms/models/room.model").Room>;
}
