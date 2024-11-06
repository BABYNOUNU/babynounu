import { Repository } from 'typeorm';
import { SettingGuardSchedules } from '../models/setting_guard_schedule.model';
export declare class SettingGeneraleService {
    constructor();
    settings(Repository: Repository<SettingGuardSchedules>): Promise<SettingGuardSchedules[]>;
}
