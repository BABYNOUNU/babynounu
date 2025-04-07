import { Repository } from 'typeorm';
import { Room } from './models/room.model';
import { UserService } from '../user/user.service';
export declare class RoomsService {
    private roomRepository;
    private readonly userService;
    constructor(roomRepository: Repository<Room>, userService: UserService);
    findOne(id: number): Promise<Room>;
    findOrCreate(parentId: number, nounouId: number): Promise<Room>;
    incrementUnreadCount(roomId: number, role: 'parent' | 'nounu' | 'administrateur'): Promise<void>;
    resetUnreadCount(roomId: number, role: 'parent' | 'nounu' | 'administrateur'): Promise<void>;
    getConversationsForUser(userId: string): Promise<any[]>;
    getGlobalUnreadCounts(roomId: number, userId: string): Promise<{
        parentUnread: number;
        nounouUnread: number;
        adminUnread: number;
    }>;
}
