import { SettingGeneraleService } from '../general.service';
import { Repository } from 'typeorm';
import { SettingDto } from '../../dto/setting.dto';
import { SettingPaymentTerms } from '../../models/setting_payment_terms.model';
export declare class SettingPaymentTermsController {
    private readonly settingGeneraleService;
    private readonly settingPaymentTerms;
    constructor(settingGeneraleService: SettingGeneraleService, settingPaymentTerms: Repository<SettingPaymentTerms>);
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
