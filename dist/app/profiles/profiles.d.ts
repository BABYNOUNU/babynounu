import { DataSource } from 'typeorm';
import { Profile } from './models/profile.model';
import { Preference } from '../Preference/models/preference.model';
import { Parameter } from '../parameter/models/parameter.model';
import { User } from '../user/user.model';
export declare const ProfileProviders: ({
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Profile>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<User>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Parameter>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Preference>;
    inject: string[];
})[];
