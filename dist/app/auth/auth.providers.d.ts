import { DataSource } from 'typeorm';
import { User } from '../user/user.model';
import { Parents } from '../parent/models/parent.model';
import { Parameter } from '../parameter/models/parameter.model';
export declare const AuthProviders: ({
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<User>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Parents>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Parameter>;
    inject: string[];
})[];
