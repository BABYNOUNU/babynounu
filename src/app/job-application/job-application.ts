
import { Injectable , Inject } from '@nestjs/common';
import { Job } from '../job/models/job.model';
import { JobApplication } from './models/job-application.model';
import { DataSource } from 'typeorm';
import { User } from '../user/user.model';
import { Notification } from '../notification/models/notification.model';

export const JobApplicationProviders = [
    {
        provide: 'JOB_APPLICATION_REPOSITORY',
        useFactory: (dataSource: DataSource) =>
              dataSource.getRepository(JobApplication),
            inject: ['DATA_SOURCE'],
    },
    {
        provide: 'JOB_REPOSITORY',
        useFactory: (dataSource: DataSource) =>
              dataSource.getRepository(Job),
            inject: ['DATA_SOURCE'],
    },
    {
        provide: 'USER_REPOSITORY',
        useFactory: (dataSource: DataSource) =>
              dataSource.getRepository(User),
            inject: ['DATA_SOURCE'],
    },
    {
      provide: 'NOTIFICATION_REPOSITORY',
      useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(Notification),
          inject: ['DATA_SOURCE'],
  }
]
