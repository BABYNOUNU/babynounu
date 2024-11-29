import { DataSource } from 'typeorm';
import { SettingGuardSchedules } from './models/setting_guard_schedule.model';
import { SettingCertifications } from './models/setting_certification.model';
import { SettingSpecificSkills } from './models/setting_specific_skill.model';
import { Roles } from '../role/models/role.model';
export declare const SettingProviders: ({
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<SettingGuardSchedules>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<SettingCertifications>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<SettingSpecificSkills>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Roles>;
    inject: string[];
})[];
