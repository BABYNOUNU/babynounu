import { SettingGeneraleService } from '../general.service';
import { Repository } from 'typeorm';
import { SettingDto } from '../../dto/setting.dto';
import { SettingSpecificSkills } from '../../models/setting_specific_skill.model';
export declare class SettingSpecificSkillController {
    private readonly settingGeneraleService;
    private readonly settingSpecificSkillRepository;
    constructor(settingGeneraleService: SettingGeneraleService, settingSpecificSkillRepository: Repository<SettingSpecificSkills>);
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
