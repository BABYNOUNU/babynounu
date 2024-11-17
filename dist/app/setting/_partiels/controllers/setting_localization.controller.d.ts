import { SettingGeneraleService } from '../general.service';
import { Repository } from 'typeorm';
import { SettingDto } from '../../dto/setting.dto';
import { SettingLocalization } from '../../models/setting_localization.model';
export declare class SettingLocalizationController {
    private readonly settingGeneraleService;
    private readonly settingLocalizationRepository;
    constructor(settingGeneraleService: SettingGeneraleService, settingLocalizationRepository: Repository<SettingLocalization>);
    GetSettings(): Promise<any[]>;
    GetSetting(slug: string): Promise<any[]>;
    CreateSetting(settingLocalizationBody: SettingDto): Promise<{
        setting: any;
    }>;
    UpdateSetting(settingLocalizationBody: SettingDto, slug: string): Promise<{
        setting: any;
    }>;
    DeleteSetting(slug: string): Promise<{
        setting: {
            slug: string;
            message: string;
        };
    }>;
}
