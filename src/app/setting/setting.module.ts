import { Module } from '@nestjs/common';
import { SettingController } from './setting.controller';
import { SettingService } from './setting.service';
import { DatabaseModule } from 'src/database/database.module';
import { SettingProviders } from './setting';

@Module({
  imports: [DatabaseModule],
  controllers: [
    SettingController,
  ],
  providers: [SettingService, ...SettingProviders],
})
export class SettingModule {}
