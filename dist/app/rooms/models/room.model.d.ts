import { User } from 'src/app/user/user.model';
import { Message } from 'src/app/messages/models/message.model';
import { ProfilParents } from 'src/app/parent/models/parent.model';
import { ProfilNounus } from 'src/app/nounus/models/nounu.model';
import { RoomMessageCount } from './unreadCount.model';
import { Contracts } from 'src/app/contracts/models/contracts.model';
export declare class Rooms {
    id: number;
    nounou: ProfilNounus;
    parent: ProfilParents;
    receiver: User;
    sender: User;
    contract: Contracts;
    unreadCounts: RoomMessageCount[];
    messages: Message[];
}
