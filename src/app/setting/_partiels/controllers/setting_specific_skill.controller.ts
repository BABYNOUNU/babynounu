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
import { SettingSpecificSkills } from '../../models/setting_specific_skill.model';
import { JwtAuthGuard } from 'src/app/auth/auh.guard';

@ApiTags('Setting Specific Skill')
@Controller('setting/specific_skill')
export class SettingSpecificSkillController {
  constructor(
    private readonly settingGeneraleService: SettingGeneraleService,
    @Inject('SETTING_SPECIFIC_SKILL_REPOSITORY')
    private readonly settingSpecificSkillRepository: Repository<SettingSpecificSkills>,
  ) {}

  @Get('')
  GetSettings() {
    return this.settingGeneraleService.settings(
      this.settingSpecificSkillRepository,
    );
  }

  // Get Signle Specific Skill
  @Get('/:slug')
  GetSetting(@Param('slug') slug: string) {
    return this.settingGeneraleService.setting(
      this.settingSpecificSkillRepository,
      { slug },
    );
  }

  // Create new Specific Skill
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('create')
  CreateSetting(@Body() settingSpecificSkillBody: SettingDto) {
    return this.settingGeneraleService.createSetting(
      this.settingSpecificSkillRepository,
      { createSettingBody: settingSpecificSkillBody },
    );
  }

  // Update Specific Skill existing
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch('update/:slug')
  UpdateSetting(
    @Body() settingSpecificSkillBody: SettingDto,
    @Param('slug') slug: string,
  ) {
    return this.settingGeneraleService.updateSetting(
      this.settingSpecificSkillRepository,
      { updateSettingBody: settingSpecificSkillBody },
      { slug },
    );
  }

  // Delete Specific Skill existing
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('/delete/:slug')
  DeleteSetting(@Param('slug') slug: string) {
    return this.settingGeneraleService.deleteSetting(
      this.settingSpecificSkillRepository,
      { slug },
    );
  }
}
