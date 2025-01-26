import { DataSource } from 'typeorm';
import { Paiements } from './models/paiement.model';
export declare const PaiementProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Paiements>;
    inject: string[];
}[];
