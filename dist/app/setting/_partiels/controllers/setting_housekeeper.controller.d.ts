import { SettingGeneraleService } from '../general.service';
import { Repository } from 'typeorm';
import { SettingDto } from '../../dto/setting.dto';
import { SettingHousekeeper } from '../../models/setting_housekeeper.model';
export declare class SettingHousekeeperController {
    private readonly settingGeneraleService;
    private readonly settingHousekeeper;
    constructor(settingGeneraleService: SettingGeneraleService, settingHousekeeper: Repository<SettingHousekeeper>);
    GetSettings(): Promise<any[]>;
    GetSetting(slug: string): Promise<any[]>;
    CreateSetting(settingSpecificSkillBody: SettingDto): Promise<{
        setting: any;
    }>;
    UpdateSetting(settingSpecificSkillBody: SettingDto, slug: string): Promise<{
        setting: any;
    }>;
    DeleteSetting(slug: string): Promise<{
        setting: {
            slug: string;
            message: string;
        };
    }>;
}
