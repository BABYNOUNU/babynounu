import { NounuSettingDeriredTimes } from 'src/app/nounu/models/nounu_setting_desired_time.model';
import { ParentSettings } from 'src/app/parent/models/parent_setting.model';
export declare class SettingDesiredTime {
    id: string;
    slug: string;
    name: string;
    description: string;
    parent: ParentSettings;
    nounuSettingAreaWork: NounuSettingDeriredTimes[];
}
