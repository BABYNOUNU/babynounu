import { SettingGuardSchedules } from '../../setting/models/setting_guard_schedule.model';
import { SettingSpecificSkills } from '../../setting/models/setting_specific_skill.model';
import { SettingLanguages } from '../../setting/models/setting_language.model';
import { settingLocalization } from '../../setting/models/setting_localization.model';
import { Nounus } from './nounu.model';
import { settingCertifications } from 'src/app/setting/models/setting_certification.model';
export declare class NounuSettings {
    id: string;
    nounu: Nounus;
    specific_skills: SettingSpecificSkills;
    language: SettingLanguages;
    guard_schedule: SettingGuardSchedules;
    localization: settingLocalization;
    certification: settingCertifications[];
}
