import { Repository } from 'typeorm';
import { SettingAgeOfChildren } from './models/setting_age_of_children.model';
import { SettingSpecificNeed } from './models/setting_specific_need.model';
import { SettingGuardSchedules } from './models/setting_guard_schedule.model';
import { SettingHousekeeper } from './models/setting_housekeeper.model';
import { SettingServiceFrequency } from './models/setting_service_frequency.model';
import { SettingDesiredTime } from './models/setting_desired_time.model';
import { SettingSpecificSkills } from './models/setting_specific_skill.model';
import { SettingLanguages } from './models/setting_language.model';
import { SettingLocalization } from './models/setting_localization.model';
import { SettingPaymentTerms } from './models/setting_payment_terms.model';
import { SettingCertifications } from './models/setting_certification.model';
import { Roles } from '../role/models/role.model';
export declare class SettingController {
    private readonly settingAgeOfChildrenRepository;
    private readonly settingSpecificNeed;
    private readonly settingGuardSchelude;
    private readonly settingHousekeeper;
    private readonly settingServiceFrequency;
    private readonly settingDesiredTime;
    private readonly settingSpecificSkills;
    private readonly settingLanguages;
    private readonly settingLocalization;
    private readonly settingPaymentTerms;
    private readonly settingCertification;
    private readonly roles;
    constructor(settingAgeOfChildrenRepository: Repository<SettingAgeOfChildren>, settingSpecificNeed: Repository<SettingSpecificNeed>, settingGuardSchelude: Repository<SettingGuardSchedules>, settingHousekeeper: Repository<SettingHousekeeper>, settingServiceFrequency: Repository<SettingServiceFrequency>, settingDesiredTime: Repository<SettingDesiredTime>, settingSpecificSkills: Repository<SettingSpecificSkills>, settingLanguages: Repository<SettingLanguages>, settingLocalization: Repository<SettingLocalization>, settingPaymentTerms: Repository<SettingPaymentTerms>, settingCertification: Repository<SettingCertifications>, roles: Repository<Roles>);
    private removeDuplicatesByName;
    private createSeeder;
    SeederAgeOfChildren(): Promise<{
        setting: any;
    }>;
    SeederSpecificNeed(): Promise<{
        setting: any;
    }>;
    SeederGuardSchedule(): Promise<{
        setting: any;
    }>;
    SeederHousekeeper(): Promise<{
        setting: any;
    }>;
    SeederServiceFrequency(): Promise<{
        setting: any;
    }>;
    SeederDesiredTimes(): Promise<{
        setting: any;
    }>;
    SeederSpecificSkills(): Promise<{
        setting: any;
    }>;
    SeederLanguages(): Promise<{
        setting: any;
    }>;
    SeederLocalization(): Promise<{
        setting: any;
    }>;
    SeederPaymentTerms(): Promise<{
        setting: any;
    }>;
    SeederCertifications(): Promise<{
        setting: any;
    }>;
    SeederRoles(): Promise<{
        setting: any;
    }>;
}
