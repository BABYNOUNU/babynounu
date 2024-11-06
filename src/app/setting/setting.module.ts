import { Module } from '@nestjs/common';
import { SettingController } from './setting.controller';
import { SettingService } from './setting.service';
import { SettingGuardScheduleController } from './_partiels/controllers/setting_guard_schedule.controller';
import { DatabaseModule } from 'src/database/database.module';
import { SettingGeneraleService } from './_partiels/general.service';
import { SettingProviders } from './setting';

@Module({
  imports: [DatabaseModule],
  controllers: [SettingController, SettingGuardScheduleController],
  providers: [SettingService, ...SettingProviders, SettingGeneraleService]
})
export class SettingModule {}
