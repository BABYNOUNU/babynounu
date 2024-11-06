import { DataSource } from 'typeorm';
import { User } from '../user/user.model';
export declare const AuthProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<User>;
    inject: string[];
}[];
