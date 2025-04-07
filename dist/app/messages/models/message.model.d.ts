import { User } from 'src/app/user/user.model';
import { Room } from 'src/app/rooms/models/room.model';
export declare class Message {
    id: number;
    content: string;
    sender: User;
    room: Room;
    isRead: boolean;
    createdAt: Date;
}
