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
import { SettingHousekeeper } from '../../models/setting_housekeeper.model';

@ApiTags('Setting Housekeeper')
@Controller('setting/housekeeper')
export class SettingHousekeeperController {
  constructor(
    private readonly settingGeneraleService: SettingGeneraleService,
    @Inject('SETTING_HOUSEKEEPER_REPOSITORY')
    private readonly settingHousekeeper: Repository<SettingHousekeeper>,
  ) {}

  @Get('')
  GetSettings() {
    return this.settingGeneraleService.settings(this.settingHousekeeper);
  }

  // Get Signle Specific Skill
  @Get('/:slug')
  GetSetting(@Param('slug') slug: string) {
    return this.settingGeneraleService.setting(this.settingHousekeeper, {
      slug,
    });
  }

  // Create new Specific Skill
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('create')
  CreateSetting(@Body() settingSpecificSkillBody: SettingDto) {
    return this.settingGeneraleService.createSetting(this.settingHousekeeper, {
      createSettingBody: settingSpecificSkillBody,
    });
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
      this.settingHousekeeper,
      { updateSettingBody: settingSpecificSkillBody },
      { slug },
    );
  }

  // Delete Specific Skill existing
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('/delete/:slug')
  DeleteSetting(@Param('slug') slug: string) {
    return this.settingGeneraleService.deleteSetting(this.settingHousekeeper, {
      slug,
    });
  }
}
