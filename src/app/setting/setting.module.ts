import { Module } from '@nestjs/common';
import { SettingController } from './setting.controller';
import { SettingService } from './setting.service';
import { SettingGuardScheduleController } from './_partiels/controllers/setting_guard_schedule.controller';
import { DatabaseModule } from 'src/database/database.module';
import { SettingGeneraleService } from './_partiels/general.service';
import { SettingProviders } from './setting';
import { SettingAgeOfChildrenController } from './_partiels/controllers/setting_age_of_children.controller';
import { SettingCertificationController } from './_partiels/controllers/setting_certification.controller';
import { SettingChildrenAgeGroupController } from './_partiels/controllers/setting_children_age_group.controller';
import { SettingServiceTypeController } from './_partiels/controllers/setting_service_type.controller';
import { SettingLanguageController } from './_partiels/controllers/setting_language.controller';
import { SettingSpecificNeedController } from './_partiels/controllers/setting_specific_need.controller';
import { SettingLocalizationController } from './_partiels/controllers/setting_localization.controller';
import { SettingSpecificSkillController } from './_partiels/controllers/setting_specific_skill.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [
    SettingController,
    SettingGuardScheduleController,
    SettingAgeOfChildrenController,
    SettingCertificationController,
    SettingChildrenAgeGroupController,
    SettingServiceTypeController,
    SettingLanguageController,
    SettingSpecificNeedController,
    SettingLocalizationController,
    SettingSpecificSkillController
  ],
  providers: [SettingService, ...SettingProviders, SettingGeneraleService],
})
export class SettingModule {}
