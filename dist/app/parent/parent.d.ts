import { DataSource } from 'typeorm';
import { Medias } from '../media/models/media.model';
import { NounuSettingSpecificSkills } from '../nounu/models/nounu_settring_specific_skill.model';
import { User } from '../user/user.model';
import { SettingSpecificSkills } from '../setting/models/setting_specific_skill.model';
import { SettingDesiredTime } from '../setting/models/setting_desired_time.model';
import { SettingCertifications } from '../setting/models/setting_certification.model';
import { SettingLocalization } from '../setting/models/setting_localization.model';
import { SettingAgeOfChildren } from '../setting/models/setting_age_of_children.model';
import { NounuSettingAreaWork } from '../nounu/models/nounu_settring_area_work.model';
import { NounuSettingDeriredTimes } from '../nounu/models/nounu_setting_desired_time.model';
import { NounuSettingCertifications } from '../nounu/models/nounu_setting_certification.model';
import { NounuSettingAgeOfChildrens } from '../nounu/models/nounu_setting_age_of_children.model';
import { NounuSettingLocalizations } from '../nounu/models/nounu_setting_localization.model';
import { NounuSettingLanguages } from '../nounu/models/nounu_setting_languages.model';
import { SettingLanguages } from '../setting/models/setting_language.model';
import { ParentSettingGuardSchedules } from './models/parent_setting_guard_schedules.model';
import { SettingGuardSchedules } from '../setting/models/setting_guard_schedule.model';
export declare const ParentProviders: ({
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<SettingLanguages>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<NounuSettingLanguages>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<NounuSettingLocalizations>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<NounuSettingAgeOfChildrens>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<NounuSettingCertifications>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<NounuSettingDeriredTimes>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<NounuSettingAreaWork>;
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
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<SettingCertifications>;
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
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<NounuSettingSpecificSkills>;
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
})[];
