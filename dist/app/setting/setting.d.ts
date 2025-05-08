import { DataSource } from 'typeorm';
import { Roles } from '../role/models/role.model';
import { TypeParameter } from '../parameter/models/parameter_type.model';
import { Parameter } from '../parameter/models/parameter.model';
import { Abonnements } from '../abonnement/models/abonnement.model';
import { Notification } from '../notification/models/notification.model';
export declare const SettingProviders: ({
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Roles>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<TypeParameter>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Parameter>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Abonnements>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Notification>;
    inject: string[];
})[];
