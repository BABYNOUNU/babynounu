import { Message } from 'src/app/messages/models/message.model';
import { Parents } from 'src/app/parent/models/parent.model';
import { Nounus } from 'src/app/nounus/models/nounu.model';
export declare class Room {
    id: number;
    nounou: Nounus;
    parent: Parents;
    messages: Message[];
    parentUnreadCount: number;
    nounuUnreadCount: number;
    administrateurUnreadCount: number;
}
