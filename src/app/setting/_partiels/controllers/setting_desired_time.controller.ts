import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SettingGeneraleService } from '../general.service';
import { Repository } from 'typeorm';
import { SettingDto } from '../../dto/setting.dto';
import { SettingAgeOfChildren } from '../../models/setting_age_of_children.model';
import { JwtAuthGuard } from 'src/app/auth/auh.guard';
import { SettingDesiredTime } from '../../models/setting_desired_time.model';

@ApiTags('Setting Desired Time')
@Controller('setting/desired-time')
export class SettingDesiredTimeController {
  constructor(
    private readonly settingGeneraleService: SettingGeneraleService,
    @Inject('SETTING_DESIRE_TIMES_REPOSITORY')
    private readonly settingDesiredTime: Repository<SettingDesiredTime>,
  ) {}

  @Get('')
  GetSettings() {
    return this.settingGeneraleService.settings(
      this.settingDesiredTime,
    );
  }

  // Get Signle Parent

  @Get('/:slug')
  GetSetting(@Param('slug') slug: string) {
    return this.settingGeneraleService.setting(
      this.settingDesiredTime,
      { slug },
    );
  }

  // Create new Parent
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('create')
  CreateSetting(@Body() settingGuardScheduleBody: SettingDto) {
    return this.settingGeneraleService.createSetting(
      this.settingDesiredTime,
      { createSettingBody: settingGuardScheduleBody },
    );
  }

  // Update parent existing
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch('update/:slug')
  UpdateSetting(
    @Body() settingGuardScheduleBody: SettingDto,
    @Param('slug') slug: string,
  ) {
    return this.settingGeneraleService.updateSetting(
      this.settingDesiredTime,
      { updateSettingBody: settingGuardScheduleBody },
      { slug },
    );
  }

  // Delete parent existing
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('/delete/:slug')
  DeleteSetting(@Param('slug') slug: string) {
    return this.settingGeneraleService.deleteSetting(
      this.settingDesiredTime,
      { slug },
    );
  }
}
