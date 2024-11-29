import { NounuSettingAgeOfChildrens } from 'src/app/nounu/models/nounu_setting_age_of_children.model';
import { ParentSettings } from 'src/app/parent/models/parent_setting.model';
export declare class SettingAgeOfChildren {
    id: string;
    slug: string;
    name: string;
    description: string;
    parent: ParentSettings;
    nounuSettingAreaWork: NounuSettingAgeOfChildrens[];
}
