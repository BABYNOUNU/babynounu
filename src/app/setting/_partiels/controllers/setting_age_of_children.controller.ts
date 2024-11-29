import { SettingAgeOfChildren } from './../../models/setting_age_of_children.model';
import { SettingDesiredTime } from './../../models/setting_desired_time.model';
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
import { JwtAuthGuard } from 'src/app/auth/auh.guard';

@ApiTags('Setting Age Of Children')
@Controller('setting/age_of_children')
export class SettingAgeOfChildrenController {
  constructor(
    private readonly settingGeneraleService: SettingGeneraleService,
    @Inject('SETTING_AGE_OF_CHILDREN_REPOSITORY')
    private readonly ssettingAgeOfChildrenRepository: Repository<SettingAgeOfChildren>,
  ) {}

  @Get('')
  GetSettings() {
    return this.settingGeneraleService.settings(
      this.ssettingAgeOfChildrenRepository,
    );
  }

  // Get Signle Parent

  @Get('/:slug')
  GetSetting(@Param('slug') slug: string) {
    return this.settingGeneraleService.setting(
      this.ssettingAgeOfChildrenRepository,
      { slug },
    );
  }

  // Create new Parent
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('create')
  CreateSetting(@Body() settingGuardScheduleBody: SettingDto) {
    return this.settingGeneraleService.createSetting(
      this.ssettingAgeOfChildrenRepository,
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
      this.ssettingAgeOfChildrenRepository,
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
      this.ssettingAgeOfChildrenRepository,
      { slug },
    );
  }
}
