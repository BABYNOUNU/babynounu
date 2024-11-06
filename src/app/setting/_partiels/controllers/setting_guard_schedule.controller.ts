import { Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SettingGuardSchedules } from '../../models/setting_guard_schedule.model';
import { SettingGeneraleService } from '../general.service';
import { Repository } from 'typeorm';

@ApiTags('Setting Guard Schedule')
@Controller('setting/guard_schedule')
export class SettingGuardScheduleController {
  constructor(
    private readonly settingGeneraleService: SettingGeneraleService, @Inject('SETTING_GUARD_SCHEDULE_REPOSITORY') private readonly settingGuardSchedulesRepository: Repository<SettingGuardSchedules>
  ) {}

  @Get('')
  GetSettings() {
   return this.settingGeneraleService.settings(this.settingGuardSchedulesRepository);
  }

  // Get Signle Parent
  @Get('/:id')
  GetSetting() {}

  // Create new Parent
  @Post('create')
  CreateSetting() {}

  // Update parent existing
  @Patch('update/:id')
  UpdateSetting() {}

  // Delete parent existing
  @Delete('/delete/:id')
  DeleteSetting(@Param('id') id: number) {}
}
