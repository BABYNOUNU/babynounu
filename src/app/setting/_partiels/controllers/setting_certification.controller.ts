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
import { SettingCertifications } from '../../models/setting_certification.model';
import { JwtAuthGuard } from 'src/app/auth/auh.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('Setting Certification')
@Controller('setting/certification')
export class SettingCertificationController {
  constructor(
    private readonly settingGeneraleService: SettingGeneraleService,
    @Inject('SETTING_CERTIFICATION_REPOSITORY')
    private readonly settingCertificationRepository: Repository<SettingCertifications>,
  ) {}

  @Get('')
  GetSettings() {
    return this.settingGeneraleService.settings(
      this.settingCertificationRepository,
    );
  }

  // Get Signle Certification
  @Get('/:slug')
  GetSetting(@Param('slug') slug: string) {
    return this.settingGeneraleService.setting(
      this.settingCertificationRepository,
      { slug },
    );
  }

  // Create new Certification
  @Post('create')
  CreateSetting(@Body() settingGuardScheduleBody: SettingDto) {
    return this.settingGeneraleService.createSetting(
      this.settingCertificationRepository,
      { createSettingBody: settingGuardScheduleBody },
    );
  }

  // Update Certification existing
  @Patch('update/:slug')
  UpdateSetting(
    @Body() settingGuardScheduleBody: SettingDto,
    @Param('slug') slug: string,
  ) {
    return this.settingGeneraleService.updateSetting(
      this.settingCertificationRepository,
      { updateSettingBody: settingGuardScheduleBody },
      { slug },
    );
  }

  // Delete Certification existing
  @Delete('/delete/:slug')
  DeleteSetting(@Param('slug') slug: string) {
    return this.settingGeneraleService.deleteSetting(
      this.settingCertificationRepository,
      { slug },
    );
  }
}
