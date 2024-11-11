import { Repository } from 'typeorm';
import { SettingGuardSchedules } from '../models/setting_guard_schedule.model';
import { SettingDto } from '../dto/setting.dto';
export declare class SettingGeneraleService {
    constructor();
    private Verify_slug;
    settings(Repository: Repository<SettingGuardSchedules>): Promise<SettingGuardSchedules[]>;
    setting(Repository: Repository<any>, { slug }: {
        slug: string;
    }): Promise<any[]>;
    createSetting(Repository: Repository<any>, { createSettingBody }: {
        createSettingBody: SettingDto;
    }): Promise<{
        setting: any;
    }>;
    updateSetting(Repository: Repository<SettingGuardSchedules>, { updateSettingBody }: {
        updateSettingBody: SettingDto;
    }, { slug }: {
        slug: string;
    }): Promise<{
        setting: {
            id: string;
            slug: string;
            name: string;
            description: string;
            parent: import("../../parent/models/parent_setting.model").ParentSettings;
            nounu: import("../../nounu/models/nounu_setting.model").NounuSettings;
        };
    }>;
    deleteSetting(Repository: Repository<SettingGuardSchedules>, { slug }: {
        slug: string;
    }): Promise<{
        setting: {
            slug: string;
            message: string;
        };
    }>;
}
