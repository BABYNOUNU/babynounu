import { ParentSettings } from 'src/app/parent/models/parent_setting.model';
export declare class SettingSpecificSkills {
    id: string;
    slug: string;
    name: string;
    description: string;
    parent: ParentSettings;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
