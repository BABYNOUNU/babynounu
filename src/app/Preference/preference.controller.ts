import { Controller, Get, Param } from '@nestjs/common';
import { PreferenceService } from './preference.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Preferences')
@Controller('preferences')
export class PreferenceController {
  constructor(private readonly preferenceService: PreferenceService) {}

  @Get()
  findAll() {
    return this.preferenceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.preferenceService.findOne(id);
  }
}