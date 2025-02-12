import { DataSource } from 'typeorm';
import { Parents } from './models/parent.model';
export declare const ParentProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Parents>;
    inject: string[];
}[];
