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
import { SettingSpecificSkills } from '../../models/setting_specific_skill.model';
import { JwtAuthGuard } from 'src/app/auth/auh.guard';
  
@UseGuards(JwtAuthGuard)
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
    @Post('create')
    CreateSetting(@Body() settingSpecificSkillBody: SettingDto) {
      return this.settingGeneraleService.createSetting(
        this.settingSpecificSkillRepository,
        { createSettingBody: settingSpecificSkillBody },
      );
    }
  
    // Update Specific Skill existing
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
    @Delete('/delete/:slug')
    DeleteSetting(@Param('slug') slug: string) {
      return this.settingGeneraleService.deleteSetting(
        this.settingSpecificSkillRepository,
        { slug },
      );
    }
  }
  