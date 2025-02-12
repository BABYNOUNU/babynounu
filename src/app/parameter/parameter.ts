import { Injectable } from '@nestjs/common';
import { DataSource, Not } from 'typeorm';
import { Parameter } from './models/parameter.model';
import { Medias } from '../media/models/media.model';

export const ParameterProviders = [
  {
    provide: 'PARAMETER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Parameter),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'TYPE_PARAMETRE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Parameter),
    inject: ['DATA_SOURCE'],
  },
];
