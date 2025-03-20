import { User } from 'src/app/user/user.model';
import { Message } from './message.model';
export declare class Rooms {
    id: number;
    sender: User;
    receiver: User;
    messages: Message[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
