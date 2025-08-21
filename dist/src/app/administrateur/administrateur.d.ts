import { DataSource } from 'typeorm';
import { UpdateApp } from './models/updateApp.model';
export declare const AdministrateurProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<UpdateApp>;
    inject: string[];
}[];
