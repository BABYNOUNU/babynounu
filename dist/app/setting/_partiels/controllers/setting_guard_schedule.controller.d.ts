import { SettingGuardSchedules } from '../../models/setting_guard_schedule.model';
import { SettingGeneraleService } from '../general.service';
import { Repository } from 'typeorm';
import { SettingDto } from '../../dto/setting.dto';
export declare class SettingGuardScheduleController {
    private readonly settingGeneraleService;
    private readonly settingGuardSchedulesRepository;
    constructor(settingGeneraleService: SettingGeneraleService, settingGuardSchedulesRepository: Repository<SettingGuardSchedules>);
    GetSettings(): Promise<any[]>;
    GetSetting(slug: string): Promise<any[]>;
    CreateSetting(settingGuardScheduleBody: SettingDto): Promise<{
        setting: any;
    }>;
    UpdateSetting(settingGuardScheduleBody: SettingDto, slug: string): Promise<{
        setting: any;
    }>;
    DeleteSetting(slug: string): Promise<{
        setting: {
            slug: string;
            message: string;
        };
    }>;
}
