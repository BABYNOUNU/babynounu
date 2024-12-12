import { Parents } from './models/parent.model';
import { Repository } from 'typeorm';
import { CreateParentDto } from './dto/create-parent.dto';
import { User } from '../user/user.model';
import { ParentSettingLanguages } from '../parent/models/parent_setting_languages.model';
import { ParentSettingLocalizations } from './models/parent_setting_localization.model';
import { ParentSettingAgeOfChildrens } from './models/parent_setting_age_of_children.model';
import { ParentSettingDeriredTimes } from './models/parent_setting_desired_time.model';
import { ParentSettingAreaWork } from './models/parent_settring_area_work.model';
import { SettingAgeOfChildren } from '../setting/models/setting_age_of_children.model';
import { SettingLocalization } from '../setting/models/setting_localization.model';
import { SettingDesiredTime } from '../setting/models/setting_desired_time.model';
import { SettingSpecificSkills } from '../setting/models/setting_specific_skill.model';
import { ParentSettingSpecificSkills } from './models/parent_settring_specific_skill.model';
import { SettingLanguages } from '../setting/models/setting_language.model';
import { ParentSettingSpecificNeeds } from './models/parent_setting_specific_need.model';
import { SettingSpecificNeed } from '../setting/models/setting_specific_need.model';
import { ParentSettingGuardSchedules } from './models/parent_setting_guard_schedules.model';
import { SettingGuardSchedules } from '../setting/models/setting_guard_schedule.model';
export declare class ParentService {
    private readonly parentSettingLanguagesRepository;
    private readonly settingLanguagesRepository;
    private readonly parentSettingLocalizationsRepository;
    private readonly parentSettingAgeOfChildrensRepository;
    private readonly parentSettingDesiredTimesRepository;
    private readonly parentSettingAreaWorksRepository;
    private readonly settingAgeOfChildrensRepository;
    private readonly settingLocalizationsRepository;
    private readonly settingDesiredTimesRepository;
    private readonly settingSpecificSkillsRepository;
    private readonly parentSettingSpecificSkillsRepository;
    private readonly userRepository;
    private parentsRepository;
    private readonly parentSettingSpecificNeedsRepository;
    private readonly settingSpecificNeedsRepository;
    private readonly parentSettingGuardSchedulesRepository;
    private readonly settingGuardSchedulesRepository;
    constructor(parentSettingLanguagesRepository: Repository<ParentSettingLanguages>, settingLanguagesRepository: Repository<SettingLanguages>, parentSettingLocalizationsRepository: Repository<ParentSettingLocalizations>, parentSettingAgeOfChildrensRepository: Repository<ParentSettingAgeOfChildrens>, parentSettingDesiredTimesRepository: Repository<ParentSettingDeriredTimes>, parentSettingAreaWorksRepository: Repository<ParentSettingAreaWork>, settingAgeOfChildrensRepository: Repository<SettingAgeOfChildren>, settingLocalizationsRepository: Repository<SettingLocalization>, settingDesiredTimesRepository: Repository<SettingDesiredTime>, settingSpecificSkillsRepository: Repository<SettingSpecificSkills>, parentSettingSpecificSkillsRepository: Repository<ParentSettingSpecificSkills>, userRepository: Repository<User>, parentsRepository: Repository<Parents>, parentSettingSpecificNeedsRepository: Repository<ParentSettingSpecificNeeds>, settingSpecificNeedsRepository: Repository<SettingSpecificNeed>, parentSettingGuardSchedulesRepository: Repository<ParentSettingGuardSchedules>, settingGuardSchedulesRepository: Repository<SettingGuardSchedules>);
    Parents(): Promise<Parents[]>;
    Parent(ParentsWhereUniqueInput: any): Promise<Parents | null>;
    create(createParentDto: CreateParentDto, files: {
        profil_image?: Express.Multer.File[];
    }): Promise<Parents>;
    UpdateParent(): Promise<Parents>;
    DeleteParent(where: any): Promise<{
        message: string;
    }>;
}
