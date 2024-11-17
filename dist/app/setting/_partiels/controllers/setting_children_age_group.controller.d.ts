import { SettingGeneraleService } from '../general.service';
import { Repository } from 'typeorm';
import { SettingDto } from '../../dto/setting.dto';
import { SettingChildrenAgeGroup } from '../../models/setting_children_age_group.model';
export declare class SettingChildrenAgeGroupController {
    private readonly settingGeneraleService;
    private readonly settingChildrenAgeGroupRepository;
    constructor(settingGeneraleService: SettingGeneraleService, settingChildrenAgeGroupRepository: Repository<SettingChildrenAgeGroup>);
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
