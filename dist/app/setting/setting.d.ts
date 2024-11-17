import { DataSource } from 'typeorm';
import { SettingGuardSchedules } from './models/setting_guard_schedule.model';
import { SettingCertifications } from './models/setting_certification.model';
import { SettingChildrenAgeGroup } from './models/setting_children_age_group.model';
import { SettingSpecificNeed } from './models/setting_specific_need.model';
import { SettingSpecificSkills } from './models/setting_specific_skill.model';
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
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<SettingChildrenAgeGroup>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<SettingSpecificNeed>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<SettingSpecificSkills>;
    inject: string[];
})[];
