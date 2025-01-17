import { Injectable } from '@nestjs/common';
import { DataSource, Not } from 'typeorm';
import { Notification } from './models/notification.model';

export const NotificationProviders = [
    {
      provide: 'NOTIFICATION_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Notification),
      inject: ['DATA_SOURCE'],
    },
  ];


