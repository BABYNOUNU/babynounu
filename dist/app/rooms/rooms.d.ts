import { DataSource } from 'typeorm';
import { Rooms } from './models/room.model';
import { RoomMessageCount } from './models/unreadCount.model';
export declare const RoomProviders: ({
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Rooms>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<RoomMessageCount>;
    inject: string[];
})[];
