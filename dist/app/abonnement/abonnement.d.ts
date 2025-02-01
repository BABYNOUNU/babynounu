import { DataSource } from 'typeorm';
import { Abonnements } from './models/abonnement.model';
import { Paiements } from '../paiement/models/paiement.model';
import { Notification } from '../notification/models/notification.model';
export declare const AbonnementProviders: ({
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Abonnements>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Paiements>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Notification>;
    inject: string[];
})[];
