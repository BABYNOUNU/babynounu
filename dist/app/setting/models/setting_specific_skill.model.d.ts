import { ParentSettings } from 'src/app/parent/models/parent_setting.model';
import { NounuSettings } from 'src/app/nounu/models/nounu_setting.model';
export declare class SettingSpecificSkills {
    id: string;
    slug: string;
    name: string;
    parent: ParentSettings;
    nounu: NounuSettings;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
