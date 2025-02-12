import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Roles } from '../role/models/role.model';
import { TypeParameter } from '../parameter/models/parameter_type.model';
import { Parameter } from '../parameter/models/parameter.model';
import { Abonnements } from '../abonnement/models/abonnement.model';
import { Notification } from '../notification/models/notification.model';


export const SettingProviders = [
   
    {
      provide: 'ROLE_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Roles),
      inject: ['DATA_SOURCE'],
    },
    {
      provide: 'TYPE_PARAMETER_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(TypeParameter),
      inject: ['DATA_SOURCE'],
    },
    {
      provide: 'PARAMETER_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Parameter),
      inject: ['DATA_SOURCE'],
    },
    {
      provide: 'ABONNEMENT_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Abonnements),
      inject: ['DATA_SOURCE'],
    },
    {
      provide: 'NOTIFICATION_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Notification),
      inject: ['DATA_SOURCE'],
    }
  ];
  