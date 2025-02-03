import { SettingSpecificSkills } from 'src/app/setting/models/setting_specific_skill.model';
import { SettingAgeOfChildren } from "src/app/setting/models/setting_age_of_children.model";
import { SettingCertifications } from "src/app/setting/models/setting_certification.model";
import { SettingDesiredTime } from "src/app/setting/models/setting_desired_time.model";
import { SettingLanguages } from "src/app/setting/models/setting_language.model";
import { SettingLocalization } from "src/app/setting/models/setting_localization.model";

export class CreateNounuDto {
    fullname: string;
    old: string;
    phone: string;
    adresse: any;
    year_experience: string;
    hourly_rate?: string;
    monthly_rate?: string;
    reference_1?: string;
    reference_2?: string;
    reference_3?: string;
    biographie?: string;
    pricing_flexibility?: boolean;
    emergencie?: boolean;
    media?: string[]; // IDs des médias associés
    setting?: string[]; // IDs des paramètres associés
    user: any; // ID de l'utilisateur
    settingLanguages?: SettingLanguages[];
    settingDesiredTimes?: SettingDesiredTime[];
    settingLocalizations?: SettingLocalization[];
    settingAgeOfChildrens?: SettingAgeOfChildren[];
    settingCertifications?: SettingCertifications[];
    settingAreaWorks?: SettingLocalization[];
    settingSpecificSkills?: SettingSpecificSkills[];
    
    photo?: string
    confirmed_identity?: string
  }
  