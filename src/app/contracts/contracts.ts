import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Contracts } from './models/contracts.model';

export const ContractsProviders = [
  {
    provide: 'CONTRACTS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Contracts),
    inject: ['DATA_SOURCE'],
  },
];
