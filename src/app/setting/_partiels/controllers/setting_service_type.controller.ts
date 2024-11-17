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
import { SettingServiceTypes } from '../../models/setting_service_type.model';
import { JwtAuthGuard } from 'src/app/auth/auh.guard';
  
@UseGuards(JwtAuthGuard)
  @ApiTags('Setting Service Type')
  @Controller('setting/service_type')
  export class SettingServiceTypeController {
    constructor(
      private readonly settingGeneraleService: SettingGeneraleService,
      @Inject('SETTING_SERVICE_TYPE_REPOSITORY')
      private readonly settingServiceTypeRepository: Repository<SettingServiceTypes>,
    ) {}
  
    @Get('')
    GetSettings() {
      return this.settingGeneraleService.settings(
        this.settingServiceTypeRepository,
      );
    }
  
    // Get Signle Service Type
    @Get('/:slug')
    GetSetting(@Param('slug') slug: string) {
      return this.settingGeneraleService.setting(
        this.settingServiceTypeRepository,
        { slug },
      );
    }
  
    // Create new Service Type
    @Post('create')
    CreateSetting(@Body() settingServiceTypeBody: SettingDto) {
      return this.settingGeneraleService.createSetting(
        this.settingServiceTypeRepository,
        { createSettingBody: settingServiceTypeBody },
      );
    }
  
    // Update Service Type existing
    @Patch('update/:slug')
    UpdateSetting(
      @Body() settingServiceTypeBody: SettingDto,
      @Param('slug') slug: string,
    ) {
      return this.settingGeneraleService.updateSetting(
        this.settingServiceTypeRepository,
        { updateSettingBody: settingServiceTypeBody },
        { slug },
      );
    }
  
    // Delete Service Type existing
    @Delete('/delete/:slug')
    DeleteSetting(@Param('slug') slug: string) {
      return this.settingGeneraleService.deleteSetting(
        this.settingServiceTypeRepository,
        { slug },
      );
    }
  }
  