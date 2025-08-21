import { DataSource } from 'typeorm';
import { Message } from './models/message.model';
export declare const MessageProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Message>;
    inject: string[];
}[];
