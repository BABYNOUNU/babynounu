import { SettingGeneraleService } from '../general.service';
import { Repository } from 'typeorm';
import { SettingDto } from '../../dto/setting.dto';
import { SettingServiceFrequency } from '../../models/setting_service_frequency.model';
export declare class SettingServiceFrequencyController {
    private readonly settingGeneraleService;
    private readonly settingServiceFrequency;
    constructor(settingGeneraleService: SettingGeneraleService, settingServiceFrequency: Repository<SettingServiceFrequency>);
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
