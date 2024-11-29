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
import { SettingChildrenAgeGroup } from '../../models/setting_children_age_group.model';

import { JwtAuthGuard } from 'src/app/auth/auh.guard';


@ApiTags('Setting Children Age Group')
@Controller('setting/children_age_group')
export class SettingChildrenAgeGroupController {
  constructor(
    private readonly settingGeneraleService: SettingGeneraleService,
    @Inject('SETTING_CERTIFICATION_REPOSITORY')
    private readonly settingChildrenAgeGroupRepository: Repository<SettingChildrenAgeGroup>,
  ) {}

  @Get('')
  GetSettings() {
    return this.settingGeneraleService.settings(
      this.settingChildrenAgeGroupRepository,
    );
  }

  // Get Signle Children Age Group
  @Get('/:slug')
  GetSetting(@Param('slug') slug: string) {
    return this.settingGeneraleService.setting(
      this.settingChildrenAgeGroupRepository,
      { slug },
    );
  }

  // Create new Children Age Group
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('create')
  CreateSetting(@Body() settingGuardScheduleBody: SettingDto) {
    return this.settingGeneraleService.createSetting(
      this.settingChildrenAgeGroupRepository,
      { createSettingBody: settingGuardScheduleBody },
    );
  }

  // Update Children Age Group existing
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch('update/:slug')
  UpdateSetting(
    @Body() settingGuardScheduleBody: SettingDto,
    @Param('slug') slug: string,
  ) {
    return this.settingGeneraleService.updateSetting(
      this.settingChildrenAgeGroupRepository,
      { updateSettingBody: settingGuardScheduleBody },
      { slug },
    );
  }

  // Delete Children Age Group existing
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('/delete/:slug')
  DeleteSetting(@Param('slug') slug: string) {
    return this.settingGeneraleService.deleteSetting(
      this.settingChildrenAgeGroupRepository,
      { slug },
    );
  }
}
