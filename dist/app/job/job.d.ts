import { Job } from './models/job.model';
import { DataSource } from 'typeorm';
export declare const JobProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Job>;
    inject: string[];
}[];
