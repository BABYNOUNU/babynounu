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
import { ApiTags } from '@nestjs/swagger';
import { SettingGeneraleService } from '../general.service';
import { Repository } from 'typeorm';
import { SettingDto } from '../../dto/setting.dto';
import { SettingSpecificNeed } from '../../models/setting_specific_need.model';
import { JwtAuthGuard } from 'src/app/auth/auh.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('Setting Specific Need')
@Controller('setting/specific_need')
export class SettingSpecificNeedController {
  constructor(
    private readonly settingGeneraleService: SettingGeneraleService,
    @Inject('SETTING_SPECIFIC_NEED_REPOSITORY')
    private readonly settingSpecificNeedRepository: Repository<SettingSpecificNeed>,
  ) {}

  @Get('')
  GetSettings() {
    return this.settingGeneraleService.settings(
      this.settingSpecificNeedRepository,
    );
  }

  // Get Signle Specific Need
  @Get('/:slug')
  GetSetting(@Param('slug') slug: string) {
    return this.settingGeneraleService.setting(
      this.settingSpecificNeedRepository,
      { slug },
    );
  }

  // Create new Specific Need
  @Post('create')
  CreateSetting(@Body() settingSpecificNeedBody: SettingDto) {
    return this.settingGeneraleService.createSetting(
      this.settingSpecificNeedRepository,
      { createSettingBody: settingSpecificNeedBody },
    );
  }

  // Update Specific Need existing
  @Patch('update/:slug')
  UpdateSetting(
    @Body() settingSpecificNeedBody: SettingDto,
    @Param('slug') slug: string,
  ) {
    return this.settingGeneraleService.updateSetting(
      this.settingSpecificNeedRepository,
      { updateSettingBody: settingSpecificNeedBody },
      { slug },
    );
  }

  // Delete Specific Need existing
  @Delete('/delete/:slug')
  DeleteSetting(@Param('slug') slug: string) {
    return this.settingGeneraleService.deleteSetting(
      this.settingSpecificNeedRepository,
      { slug },
    );
  }
}
