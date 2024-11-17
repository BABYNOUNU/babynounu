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
import { SettingLanguages } from '../../models/setting_language.model';

import { JwtAuthGuard } from 'src/app/auth/auh.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('Setting Language')
@Controller('setting/language')
export class SettingLanguageController {
  constructor(
    private readonly settingGeneraleService: SettingGeneraleService,
    @Inject('SETTING_LANGUAGE_REPOSITORY')
    private readonly settingLanguageRepository: Repository<SettingLanguages>,
  ) {}

  @Get('')
  GetSettings() {
    return this.settingGeneraleService.settings(this.settingLanguageRepository);
  }

  // Get Signle Language
  @Get('/:slug')
  GetSetting(@Param('slug') slug: string) {
    return this.settingGeneraleService.setting(this.settingLanguageRepository, {
      slug,
    });
  }

  // Create new Language
  @Post('create')
  CreateSetting(@Body() settingLanguageBody: SettingDto) {
    return this.settingGeneraleService.createSetting(
      this.settingLanguageRepository,
      { createSettingBody: settingLanguageBody },
    );
  }

  // Update Language existing
  @Patch('update/:slug')
  UpdateSetting(
    @Body() settingLanguageBody: SettingDto,
    @Param('slug') slug: string,
  ) {
    return this.settingGeneraleService.updateSetting(
      this.settingLanguageRepository,
      { updateSettingBody: settingLanguageBody },
      { slug },
    );
  }

  // Delete Language existing
  @Delete('/delete/:slug')
  DeleteSetting(@Param('slug') slug: string) {
    return this.settingGeneraleService.deleteSetting(
      this.settingLanguageRepository,
      { slug },
    );
  }
}
