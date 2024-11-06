import slugify from 'slugify';
import { User } from 'src/app/user/user.model';
import { Repository } from 'typeorm';
import { SettingGuardSchedules } from '../models/setting_guard_schedule.model';
import { Injectable } from '@nestjs/common';


@Injectable()
export class SettingGeneraleService {
  constructor() {}

  async settings(Repository: Repository<SettingGuardSchedules>) {
    return await Repository.find();
  }
 
}
