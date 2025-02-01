import { Job } from './models/job.model';
import { DataSource } from 'typeorm';
import { SettingDesiredTime } from '../setting/models/setting_desired_time.model';
import { SettingServiceFrequency } from '../setting/models/setting_service_frequency.model';
export declare const JobProviders: ({
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Job>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<SettingDesiredTime>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<SettingServiceFrequency>;
    inject: string[];
})[];
