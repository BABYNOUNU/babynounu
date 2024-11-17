import { SettingGeneraleService } from '../general.service';
import { Repository } from 'typeorm';
import { SettingDto } from '../../dto/setting.dto';
import { SettingCertifications } from '../../models/setting_certification.model';
export declare class SettingCertificationController {
    private readonly settingGeneraleService;
    private readonly settingCertificationRepository;
    constructor(settingGeneraleService: SettingGeneraleService, settingCertificationRepository: Repository<SettingCertifications>);
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
