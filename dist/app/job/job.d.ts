import { Job } from './models/job.model';
import { DataSource } from 'typeorm';
import { Preference } from '../Preference/models/preference.model';
export declare const JobProviders: ({
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Job>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Preference>;
    inject: string[];
})[];
