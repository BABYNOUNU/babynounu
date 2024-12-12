import { DataSource } from 'typeorm';
import { User } from '../user/user.model';
import { Nounus } from '../nounu/models/nounu.model';
import { SettingTypeProfil } from '../setting/models/setting_type_profil.model';
import { Parents } from '../parent/models/parent.model';
export declare const AuthProviders: ({
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<User>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Nounus>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Parents>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<SettingTypeProfil>;
    inject: string[];
})[];
