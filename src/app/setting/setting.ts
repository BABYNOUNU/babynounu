import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { SettingGuardSchedules } from './models/setting_guard_schedule.model';
import { SettingAgeOfChildren } from './models/setting_age_of_children.model';


export const SettingProviders = [
    {
      provide: 'SETTING_GUARD_SCHEDULE_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(SettingGuardSchedules),
      inject: ['DATA_SOURCE'],
    },
    {
      provide: 'SETTING_AGE_OF_CHILDREN_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(SettingAgeOfChildren),
      inject: ['DATA_SOURCE'],
    },
  ];
