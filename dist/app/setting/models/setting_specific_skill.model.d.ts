import { NounuSettingSpecificSkills } from 'src/app/nounu/models/nounu_settring_specific_skill.model';
export declare class SettingSpecificSkills {
    id: string;
    slug: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    nounuSettingSpecificSkill: NounuSettingSpecificSkills[];
}
