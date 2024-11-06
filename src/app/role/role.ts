import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Roles } from './models/role.model';


export const RoleProviders = [
    {
      provide: 'ROLE_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Roles),
      inject: ['DATA_SOURCE'],
    },
  ];

