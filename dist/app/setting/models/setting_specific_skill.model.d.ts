import { ParentSettings } from 'src/app/parent/models/parent_setting.model';
import { NounuSettingSpecificSkills } from 'src/app/nounu/models/nounu_settring_specific_skill.model';
export declare class SettingSpecificSkills {
    id: string;
    slug: string;
    name: string;
    description: string;
    parent: ParentSettings;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    nounuSettingAreaWork: NounuSettingSpecificSkills[];
}
