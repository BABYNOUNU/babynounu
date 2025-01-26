import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Paiements } from './models/paiement.model';

export const PaiementProviders = [
  {
    provide: 'PAYMENT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Paiements),
    inject: ['DATA_SOURCE'],
  },
];
