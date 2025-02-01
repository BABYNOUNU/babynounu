import { User } from 'src/app/user/user.model';
import { Message } from './message.model';
export declare class Conversation {
    id: number;
    user: User;
    messages: Message[];
}
