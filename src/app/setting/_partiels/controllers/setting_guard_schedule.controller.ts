import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SettingGuardSchedules } from '../../models/setting_guard_schedule.model';
import { SettingGeneraleService } from '../general.service';
import { Repository } from 'typeorm';
import { SettingDto } from '../../dto/setting.dto';

@ApiTags('Setting Guard Schedule')
@Controller('setting/guard_schedule')
export class SettingGuardScheduleController {
  constructor(
    private readonly settingGeneraleService: SettingGeneraleService,
    @Inject('SETTING_GUARD_SCHEDULE_REPOSITORY')
    private readonly settingGuardSchedulesRepository: Repository<SettingGuardSchedules>,
  ) {}

  @Get('')
  GetSettings() {
    return this.settingGeneraleService.settings(
      this.settingGuardSchedulesRepository,
    );
  }

  // Get Signle Parent
  @Get('/:slug')
  GetSetting(@Param('slug') slug: string) {
    return this.settingGeneraleService.setting(
      this.settingGuardSchedulesRepository,
      { slug },
    );
  }

  // Create new Parent
  @Post('create')
  CreateSetting(@Body() settingGuardScheduleBody: SettingDto) {
    return this.settingGeneraleService.createSetting(
      this.settingGuardSchedulesRepository,
      { createSettingBody: settingGuardScheduleBody },
    );
  }

  // Update parent existing
  @Patch('update/:slug')
  UpdateSetting(
    @Body() settingGuardScheduleBody: SettingDto,
    @Param('slug') slug: string,
  ) {
    return this.settingGeneraleService.updateSetting(
      this.settingGuardSchedulesRepository,
      { updateSettingBody: settingGuardScheduleBody },
      { slug },
    );
  }

  // Delete parent existing
  @Delete('/delete/:slug')
  DeleteSetting(@Param('slug') slug: string) {
    return this.settingGeneraleService.deleteSetting(
      this.settingGuardSchedulesRepository,
      { slug },
    );
  }
}
