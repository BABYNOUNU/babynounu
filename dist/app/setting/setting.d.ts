import { DataSource } from 'typeorm';
import { SettingGuardSchedules } from './models/setting_guard_schedule.model';
import { SettingAgeOfChildren } from './models/setting_age_of_children.model';
import { SettingCertifications } from './models/setting_certification.model';
import { SettingSpecificSkills } from './models/setting_specific_skill.model';
import { SettingLanguages } from './models/setting_language.model';
import { SettingLocalization } from './models/setting_localization.model';
import { SettingDesiredTime } from './models/setting_desired_time.model';
import { Roles } from '../role/models/role.model';
import { SettingTypeProfil } from './models/setting_type_profil.model';
export declare const SettingProviders: ({
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<SettingGuardSchedules>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<SettingAgeOfChildren>;
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
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<SettingLanguages>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<SettingLocalization>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<SettingDesiredTime>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Roles>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<SettingTypeProfil>;
    inject: string[];
})[];
