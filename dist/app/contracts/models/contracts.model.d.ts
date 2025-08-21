import { Rooms } from 'src/app/rooms/models/room.model';
import { Message } from 'src/app/messages/models/message.model';
export declare class Contracts {
    id: number;
    room: Rooms;
    message: Message;
    status: 'Accepted' | 'Pending' | 'Canceled';
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
