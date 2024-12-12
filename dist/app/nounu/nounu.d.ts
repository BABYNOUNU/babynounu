import { DataSource } from 'typeorm';
import { NounuSettings } from './models/nounu_setting.model';
import { Nounus } from './models/nounu.model';
import { SettingLanguages } from '../setting/models/setting_language.model';
import { NounuSettingLanguages } from './models/nounu_setting_languages.model';
import { NounuSettingCertifications } from './models/nounu_setting_certification.model';
import { NounuSettingAgeOfChildrens } from './models/nounu_setting_age_of_children.model';
import { NounuSettingLocalizations } from './models/nounu_setting_localization.model';
import { NounuSettingAreaWork } from './models/nounu_settring_area_work.model';
import { NounuSettingDeriredTimes } from './models/nounu_setting_desired_time.model';
import { SettingAgeOfChildren } from '../setting/models/setting_age_of_children.model';
import { SettingLocalization } from '../setting/models/setting_localization.model';
import { SettingCertifications } from '../setting/models/setting_certification.model';
import { User } from '../user/user.model';
import { SettingDesiredTime } from '../setting/models/setting_desired_time.model';
import { SettingSpecificSkills } from '../setting/models/setting_specific_skill.model';
import { Medias } from '../media/models/media.model';
import { NounuSettingSpecificSkills } from './models/nounu_settring_specific_skill.model';
export declare const NounuProviders: ({
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<NounuSettings>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Nounus>;
    inject: string[];
} | {
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
})[];
