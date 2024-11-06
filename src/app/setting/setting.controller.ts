import { Controller, Get } from '@nestjs/common';
import { SettingGuardScheduleController } from './_partiels/controllers/setting_guard_schedule.controller';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Setting')
@Controller('setting')
export class SettingController {

    // Get All Parents
    @Get('')
    GetParents() {}
    
}
