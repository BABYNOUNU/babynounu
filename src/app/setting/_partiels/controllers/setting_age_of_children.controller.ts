import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Param,
    Patch,
    Post,
  } from '@nestjs/common';
  import { ApiTags } from '@nestjs/swagger';
  import { SettingGeneraleService } from '../general.service';
  import { Repository } from 'typeorm';
  import { SettingDto } from '../../dto/setting.dto';
import { SettingAgeOfChildren } from '../../models/setting_age_of_children.model';
  
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
    @Post('create')
    CreateSetting(@Body() settingGuardScheduleBody: SettingDto) {
      return this.settingGeneraleService.createSetting(
        this.ssettingAgeOfChildrenRepository,
        { createSettingBody: settingGuardScheduleBody },
      );
    }
  
    // Update parent existing
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
    @Delete('/delete/:slug')
    DeleteSetting(@Param('slug') slug: string) {
      return this.settingGeneraleService.deleteSetting(
        this.ssettingAgeOfChildrenRepository,
        { slug },
      );
    }
  }
  