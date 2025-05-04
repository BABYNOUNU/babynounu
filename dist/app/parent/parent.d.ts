import { DataSource } from 'typeorm';
import { ProfilParents } from './models/parent.model';
export declare const ParentProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<ProfilParents>;
    inject: string[];
}[];
