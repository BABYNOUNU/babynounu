import { Injectable } from '@nestjs/common';
import { use } from 'passport';
import { Job } from './models/job.model';
import { DataSource } from 'typeorm';
import { Preference } from '../Preference/models/preference.model';

export const JobProviders = [
  {
    provide: 'JOB_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Job),
    inject: ['DATA_SOURCE'],
  },
   {
      provide: 'PREFERENCE_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Preference),
      inject: ['DATA_SOURCE'],
    },
];
