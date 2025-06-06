import { User } from '../user/user.model';
import { MessageService } from '../messages/messages.service';
import { RoomsService } from '../rooms/rooms.service';
export declare class ChatController {
    private roomService;
    private messageService;
    constructor(roomService: RoomsService, messageService: MessageService);
    getMessages(roomId: number): Promise<import("../messages/models/message.model").Message[]>;
    getUserConversations(user: User): Promise<{
        room: import("../rooms/models/room.model").Rooms;
        nounuPhoto: import("../media/models/media.model").Medias;
        parentPhoto: import("../media/models/media.model").Medias;
        lastMessage: import("../messages/models/message.model").Message;
        unreadCount: number;
    }[]>;
    createOrGetRoom(nounouId: string, parentId: string, userId: string): Promise<{
        photo: import("../media/models/media.model").Medias;
        id: number;
        nounou: import("../nounus/models/nounu.model").ProfilNounus;
        parent: import("../parent/models/parent.model").ProfilParents;
        receiver: User;
        sender: User;
        contract: import("../contracts/models/contracts.model").Contracts;
        unreadCounts: import("../rooms/models/unreadCount.model").RoomMessageCount[];
        messages: import("../messages/models/message.model").Message[];
    }>;
    getTotalUnreadCount(user: User): Promise<number>;
    getRoom(user: any, roomId: number): Promise<{
        photo: import("../media/models/media.model").Medias;
        id: number;
        nounou: import("../nounus/models/nounu.model").ProfilNounus;
        parent: import("../parent/models/parent.model").ProfilParents;
        receiver: User;
        sender: User;
        contract: import("../contracts/models/contracts.model").Contracts;
        unreadCounts: import("../rooms/models/unreadCount.model").RoomMessageCount[];
        messages: import("../messages/models/message.model").Message[];
    }>;
    getRoomUnreadCount(roomId: number, user: User): Promise<number>;
    markAsRead(roomId: number, user: User): Promise<{
        roomId: number;
        userId: string;
        count: number;
    }>;
}
