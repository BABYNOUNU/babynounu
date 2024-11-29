import { SettingGeneraleService } from '../general.service';
import { Repository } from 'typeorm';
import { SettingDto } from '../../dto/setting.dto';
import { SettingDesiredTime } from '../../models/setting_desired_time.model';
export declare class SettingDesiredTimeController {
    private readonly settingGeneraleService;
    private readonly settingDesiredTime;
    constructor(settingGeneraleService: SettingGeneraleService, settingDesiredTime: Repository<SettingDesiredTime>);
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
