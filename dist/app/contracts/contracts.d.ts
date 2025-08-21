import { DataSource } from 'typeorm';
import { Contracts } from './models/contracts.model';
export declare const ContractsProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Contracts>;
    inject: string[];
}[];
