import { Injectable } from '@nestjs/common';
import { DataSource, Not } from 'typeorm';
import { Parameter } from './models/parameter.model';

export const ParameterProviders = [
  {
    provide: 'PARAMETRE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Parameter),
    inject: ['DATA_SOURCE'],
  },
];
