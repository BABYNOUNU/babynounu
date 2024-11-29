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
import { SettingLocalization } from '../../models/setting_localization.model';
import { JwtAuthGuard } from 'src/app/auth/auh.guard';

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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('create')
  CreateSetting(@Body() settingLocalizationBody: SettingDto) {
    return this.settingGeneraleService.createSetting(
      this.settingLocalizationRepository,
      { createSettingBody: settingLocalizationBody },
    );
  }

  // Update Localization existing
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('/delete/:slug')
  DeleteSetting(@Param('slug') slug: string) {
    return this.settingGeneraleService.deleteSetting(
      this.settingLocalizationRepository,
      { slug },
    );
  }
}
