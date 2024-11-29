import { SettingService } from './../../setting.service';
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
import { SettingServiceFrequency } from '../../models/setting_service_frequency.model';

@ApiTags('Setting Services Frequency')
@Controller('setting/service_frequency')
export class SettingServiceFrequencyController {
  constructor(
    private readonly settingGeneraleService: SettingGeneraleService,
    @Inject('SETTING_SERVICE_FREQUENCY_REPOSITORY')
    private readonly settingServiceFrequency: Repository<SettingServiceFrequency>,
  ) {}

  @Get('')
  GetSettings() {
    return this.settingGeneraleService.settings(
      this.settingServiceFrequency,
    );
  }

  // Get Signle Parent

  @Get('/:slug')
  GetSetting(@Param('slug') slug: string) {
    return this.settingGeneraleService.setting(
      this.settingServiceFrequency,
      { slug },
    );
  }

  // Create new Parent
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('create')
  CreateSetting(@Body() settingGuardScheduleBody: SettingDto) {
    return this.settingGeneraleService.createSetting(
      this.settingServiceFrequency,
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
      this.settingServiceFrequency,
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
      this.settingServiceFrequency,
      { slug },
    );
  }
}
