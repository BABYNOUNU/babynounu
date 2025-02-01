import { Injectable } from '@nestjs/common';
import { use } from 'passport';
import { Job } from './models/job.model';
import { DataSource } from 'typeorm';
import { SettingDesiredTime } from '../setting/models/setting_desired_time.model';
import { ParentSettingDeriredTimes } from '../parent/models/parent_setting_desired_time.model';
import { ParentSettingServiceFrequency } from '../parent/models/parent_setting_service_frequency.model';
import { SettingServiceFrequency } from '../setting/models/setting_service_frequency.model';

export const JobProviders = [
  {
    provide: 'JOB_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Job),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'SETTING_DESIRED_TIME_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SettingDesiredTime),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'SETTING_SERVICE_FREQUENCY_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SettingServiceFrequency),
    inject: ['DATA_SOURCE'],
  },
];
