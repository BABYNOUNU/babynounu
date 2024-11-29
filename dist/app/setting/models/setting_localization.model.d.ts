import { NounuSettingAreaWork } from 'src/app/nounu/models/nounu_settring_area_work.model';
import { ParentSettings } from 'src/app/parent/models/parent_setting.model';
export declare class SettingLocalization {
    id: string;
    slug: string;
    name: string;
    description: string;
    parent: ParentSettings;
    nounuSettingAreaWork: NounuSettingAreaWork[];
}
