import { DataSource } from 'typeorm';
import { Abonnements } from './models/abonnement.model';
export declare const AbonnementProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Abonnements>;
    inject: string[];
}[];
