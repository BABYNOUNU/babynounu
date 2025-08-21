import { DataSource } from 'typeorm';
import { Roles } from './models/role.model';
export declare const RoleProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Roles>;
    inject: string[];
}[];
