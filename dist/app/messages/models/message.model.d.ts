import { User } from 'src/app/user/user.model';
import { Rooms } from 'src/app/rooms/models/room.model';
import { Contracts } from 'src/app/contracts/models/contracts.model';
export declare class Message {
    id: number;
    content: string;
    sender: User;
    contract: Contracts;
    room: Rooms;
    isRead: boolean;
    type: 'Message' | 'Proposition';
    isProposition: boolean;
    propositionExpired: string | null;
    proposalStatus: 'Accepted' | 'Refused' | 'Pending';
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
