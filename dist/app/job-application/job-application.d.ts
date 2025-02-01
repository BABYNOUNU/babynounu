import { Job } from '../Job/models/Job.model';
import { JobApplication } from './models/job-application.model';
import { DataSource } from 'typeorm';
import { User } from '../user/user.model';
import { Notification } from '../notification/models/notification.model';
export declare const JobApplicationProviders: ({
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<JobApplication>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Job>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<User>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Notification>;
    inject: string[];
})[];
