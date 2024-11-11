import { Module } from '@nestjs/common';
import { SettingController } from './setting.controller';
import { SettingService } from './setting.service';
import { SettingGuardScheduleController } from './_partiels/controllers/setting_guard_schedule.controller';
import { DatabaseModule } from 'src/database/database.module';
import { SettingGeneraleService } from './_partiels/general.service';
import { SettingProviders } from './setting';
import { SettingAgeOfChildrenController } from './_partiels/controllers/setting_age_of_children.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [SettingController, SettingGuardScheduleController, SettingAgeOfChildrenController],
  providers: [SettingService, ...SettingProviders, SettingGeneraleService]
})
export class SettingModule {}
