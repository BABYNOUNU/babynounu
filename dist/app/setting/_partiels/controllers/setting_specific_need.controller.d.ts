import { SettingGeneraleService } from '../general.service';
import { Repository } from 'typeorm';
import { SettingDto } from '../../dto/setting.dto';
import { SettingSpecificNeed } from '../../models/setting_specific_need.model';
export declare class SettingSpecificNeedController {
    private readonly settingGeneraleService;
    private readonly settingSpecificNeedRepository;
    constructor(settingGeneraleService: SettingGeneraleService, settingSpecificNeedRepository: Repository<SettingSpecificNeed>);
    GetSettings(): Promise<any[]>;
    GetSetting(slug: string): Promise<any[]>;
    CreateSetting(settingSpecificNeedBody: SettingDto): Promise<{
        setting: any;
    }>;
    UpdateSetting(settingSpecificNeedBody: SettingDto, slug: string): Promise<{
        setting: any;
    }>;
    DeleteSetting(slug: string): Promise<{
        setting: {
            slug: string;
            message: string;
        };
    }>;
}
