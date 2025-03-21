import { Rooms } from './rooms.model';
import { User } from 'src/app/user/user.model';
export declare class ChatRooms {
    id: number;
    sender: User;
    room: Rooms;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
