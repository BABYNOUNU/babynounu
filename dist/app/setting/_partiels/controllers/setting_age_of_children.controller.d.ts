import { SettingAgeOfChildren } from './../../models/setting_age_of_children.model';
import { SettingGeneraleService } from '../general.service';
import { Repository } from 'typeorm';
import { SettingDto } from '../../dto/setting.dto';
export declare class SettingAgeOfChildrenController {
    private readonly settingGeneraleService;
    private readonly ssettingAgeOfChildrenRepository;
    constructor(settingGeneraleService: SettingGeneraleService, ssettingAgeOfChildrenRepository: Repository<SettingAgeOfChildren>);
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
