import { SettingGuardSchedules } from '../../models/setting_guard_schedule.model';
import { SettingGeneraleService } from '../general.service';
import { Repository } from 'typeorm';
export declare class SettingGuardScheduleController {
    private readonly settingGeneraleService;
    private readonly settingGuardSchedulesRepository;
    constructor(settingGeneraleService: SettingGeneraleService, settingGuardSchedulesRepository: Repository<SettingGuardSchedules>);
    GetSettings(): Promise<SettingGuardSchedules[]>;
    GetSetting(): void;
    CreateSetting(): void;
    UpdateSetting(): void;
    DeleteSetting(id: number): void;
}
