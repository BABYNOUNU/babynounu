import { DataSource } from 'typeorm';
import { Medias } from '../media/models/media.model';
import { User } from '../user/user.model';
export declare const ParentProviders: ({
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<User>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Medias>;
    inject: string[];
})[];
