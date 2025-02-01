import { DataSource } from 'typeorm';
import { Medias } from '../media/models/media.model';
import { ParentSettingSpecificSkills } from '../parent/models/parent_settring_specific_skill.model';
import { User } from '../user/user.model';
import { SettingSpecificSkills } from '../setting/models/setting_specific_skill.model';
import { SettingDesiredTime } from '../setting/models/setting_desired_time.model';
import { SettingLocalization } from '../setting/models/setting_localization.model';
import { SettingAgeOfChildren } from '../setting/models/setting_age_of_children.model';
import { ParentSettingAreaWork } from '../parent/models/parent_settring_area_work.model';
import { ParentSettingDeriredTimes } from '../parent/models/parent_setting_desired_time.model';
import { ParentSettingAgeOfChildrens } from '../parent/models/parent_setting_age_of_children.model';
import { ParentSettingLocalizations } from '../parent/models/parent_setting_localization.model';
import { ParentSettingLanguages } from '../parent/models/parent_setting_languages.model';
import { SettingLanguages } from '../setting/models/setting_language.model';
import { ParentSettingGuardSchedules } from './models/parent_setting_guard_schedules.model';
import { SettingGuardSchedules } from '../setting/models/setting_guard_schedule.model';
import { Parents } from './models/parent.model';
import { ParentSettingServiceFrequency } from './models/parent_setting_service_frequency.model';
export declare const ParentProviders: ({
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<SettingLanguages>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<ParentSettingLanguages>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<ParentSettingSpecificSkills>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<ParentSettingLocalizations>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<ParentSettingAgeOfChildrens>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<ParentSettingDeriredTimes>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<ParentSettingAreaWork>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<SettingAgeOfChildren>;
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
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<SettingSpecificSkills>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<User>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Medias>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<ParentSettingGuardSchedules>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<SettingGuardSchedules>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Parents>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<ParentSettingServiceFrequency>;
    inject: string[];
})[];
