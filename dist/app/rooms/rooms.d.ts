import { DataSource } from 'typeorm';
import { Room } from './models/room.model';
export declare const RoomProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Room>;
    inject: string[];
}[];
