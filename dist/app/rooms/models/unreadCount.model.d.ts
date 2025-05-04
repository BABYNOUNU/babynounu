import { Rooms } from "./room.model";
import { User } from "src/app/user/user.model";
export declare class RoomMessageCount {
    id: number;
    room: Rooms;
    user: User;
    count: number;
}
