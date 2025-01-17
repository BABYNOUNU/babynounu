import { DataSource } from 'typeorm';
import { Notification } from './models/notification.model';
export declare const NotificationProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Notification>;
    inject: string[];
}[];
