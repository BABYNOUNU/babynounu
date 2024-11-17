import { SettingGeneraleService } from '../general.service';
import { Repository } from 'typeorm';
import { SettingDto } from '../../dto/setting.dto';
import { SettingLanguages } from '../../models/setting_language.model';
export declare class SettingLanguageController {
    private readonly settingGeneraleService;
    private readonly settingLanguageRepository;
    constructor(settingGeneraleService: SettingGeneraleService, settingLanguageRepository: Repository<SettingLanguages>);
    GetSettings(): Promise<any[]>;
    GetSetting(slug: string): Promise<any[]>;
    CreateSetting(settingLanguageBody: SettingDto): Promise<{
        setting: any;
    }>;
    UpdateSetting(settingLanguageBody: SettingDto, slug: string): Promise<{
        setting: any;
    }>;
    DeleteSetting(slug: string): Promise<{
        setting: {
            slug: string;
            message: string;
        };
    }>;
}
