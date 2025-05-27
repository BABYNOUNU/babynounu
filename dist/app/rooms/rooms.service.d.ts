import { Repository } from 'typeorm';
import { Rooms } from './models/room.model';
import { RoomMessageCount } from './models/unreadCount.model';
import { Message } from '../messages/models/message.model';
export declare class RoomsService {
    private roomRepository;
    private readonly messageRepository;
    private readonly unreadCountRepository;
    constructor(roomRepository: Repository<Rooms>, messageRepository: Repository<Message>, unreadCountRepository: Repository<RoomMessageCount>);
    getUserConversations(userId: string): Promise<{
        room: Rooms;
        nounuPhoto: import("../media/models/media.model").Medias;
        parentPhoto: import("../media/models/media.model").Medias;
        lastMessage: Message;
        unreadCount: number;
    }[]>;
    createOrGetRoom(senderId: string, parentId: string, nounouId: string): Promise<{
        photo: import("../media/models/media.model").Medias;
        id: number;
        nounou: import("../nounus/models/nounu.model").ProfilNounus;
        parent: import("../parent/models/parent.model").ProfilParents;
        receiver: import("../user/user.model").User;
        sender: import("../user/user.model").User;
        contract: import("../contracts/models/contracts.model").Contracts;
        unreadCounts: RoomMessageCount[];
        messages: Message[];
    }>;
    private initializeUnreadCounts;
    getTotalUnreadCount(userId: string): Promise<number>;
    incrementUnreadCount(roomId: number, userId: string): Promise<number>;
    resetUnreadCount(roomId: number, userId: string): Promise<{
        roomId: number;
        userId: string;
        count: number;
    }>;
    getRoom(roomId: number, senderId?: any): Promise<{
        photo: import("../media/models/media.model").Medias;
        id: number;
        nounou: import("../nounus/models/nounu.model").ProfilNounus;
        parent: import("../parent/models/parent.model").ProfilParents;
        receiver: import("../user/user.model").User;
        sender: import("../user/user.model").User;
        contract: import("../contracts/models/contracts.model").Contracts;
        unreadCounts: RoomMessageCount[];
        messages: Message[];
    }>;
    getRoomUnreadCount(roomId: number, userId: string): Promise<number>;
}
