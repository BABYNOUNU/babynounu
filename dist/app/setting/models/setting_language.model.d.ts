import { NounuSettingLanguages } from 'src/app/nounu/models/nounu_setting_languages.model';
import { ParentSettings } from 'src/app/parent/models/parent_setting.model';
export declare class SettingLanguages {
    id: string;
    slug: string;
    name: string;
    description: string;
    parent: ParentSettings;
    nounuSettingLanguages: NounuSettingLanguages[];
}
