import { SettingGeneraleService } from '../general.service';
import { Repository } from 'typeorm';
import { SettingDto } from '../../dto/setting.dto';
import { SettingServiceTypes } from '../../models/setting_service_type.model';
export declare class SettingServiceTypeController {
    private readonly settingGeneraleService;
    private readonly settingServiceTypeRepository;
    constructor(settingGeneraleService: SettingGeneraleService, settingServiceTypeRepository: Repository<SettingServiceTypes>);
    GetSettings(): Promise<any[]>;
    GetSetting(slug: string): Promise<any[]>;
    CreateSetting(settingServiceTypeBody: SettingDto): Promise<{
        setting: any;
    }>;
    UpdateSetting(settingServiceTypeBody: SettingDto, slug: string): Promise<{
        setting: any;
    }>;
    DeleteSetting(slug: string): Promise<{
        setting: {
            slug: string;
            message: string;
        };
    }>;
}
