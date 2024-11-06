import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { SettingGuardSchedules } from './models/setting_guard_schedule.model';


export const SettingProviders = [
    {
      provide: 'SETTING_GUARD_SCHEDULE_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(SettingGuardSchedules),
      inject: ['DATA_SOURCE'],
    },
  ];
