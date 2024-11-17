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
import { SettingLocalization } from '../../models/setting_localization.model';
import { JwtAuthGuard } from 'src/app/auth/auh.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('Setting Localization')
@Controller('setting/localization')
export class SettingLocalizationController {
  constructor(
    private readonly settingGeneraleService: SettingGeneraleService,
    @Inject('SETTING_LOCALIZATION_REPOSITORY')
    private readonly settingLocalizationRepository: Repository<SettingLocalization>,
  ) {}

  @Get('')
  GetSettings() {
    return this.settingGeneraleService.settings(
      this.settingLocalizationRepository,
    );
  }

  // Get Signle Localization
  @Get('/:slug')
  GetSetting(@Param('slug') slug: string) {
    return this.settingGeneraleService.setting(
      this.settingLocalizationRepository,
      { slug },
    );
  }

  // Create new Localization
  @Post('create')
  CreateSetting(@Body() settingLocalizationBody: SettingDto) {
    return this.settingGeneraleService.createSetting(
      this.settingLocalizationRepository,
      { createSettingBody: settingLocalizationBody },
    );
  }

  // Update Localization existing
  @Patch('update/:slug')
  UpdateSetting(
    @Body() settingLocalizationBody: SettingDto,
    @Param('slug') slug: string,
  ) {
    return this.settingGeneraleService.updateSetting(
      this.settingLocalizationRepository,
      { updateSettingBody: settingLocalizationBody },
      { slug },
    );
  }

  // Delete Localization existing
  @Delete('/delete/:slug')
  DeleteSetting(@Param('slug') slug: string) {
    return this.settingGeneraleService.deleteSetting(
      this.settingLocalizationRepository,
      { slug },
    );
  }
}
