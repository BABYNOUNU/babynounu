import { SettingGuardSchedules } from '../../models/setting_guard_schedule.model';
import { SettingGeneraleService } from '../general.service';
import { Repository } from 'typeorm';
import { SettingDto } from '../../dto/setting.dto';
export declare class SettingGuardScheduleController {
    private readonly settingGeneraleService;
    private readonly settingGuardSchedulesRepository;
    constructor(settingGeneraleService: SettingGeneraleService, settingGuardSchedulesRepository: Repository<SettingGuardSchedules>);
    GetSettings(): Promise<SettingGuardSchedules[]>;
    GetSetting(slug: string): Promise<any[]>;
    CreateSetting(settingGuardScheduleBody: SettingDto): Promise<{
        setting: any;
    }>;
    UpdateSetting(settingGuardScheduleBody: SettingDto, slug: string): Promise<{
        setting: {
            id: string;
            slug: string;
            name: string;
            description: string;
            parent: import("../../../parent/models/parent_setting.model").ParentSettings;
            nounu: import("../../../nounu/models/nounu_setting.model").NounuSettings;
        };
    }>;
    DeleteSetting(slug: string): Promise<{
        setting: {
            slug: string;
            message: string;
        };
    }>;
}
