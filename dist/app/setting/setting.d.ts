import { DataSource } from 'typeorm';
import { SettingGuardSchedules } from './models/setting_guard_schedule.model';
export declare const SettingProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<SettingGuardSchedules>;
    inject: string[];
}[];
