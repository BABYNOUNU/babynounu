import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Abonnements } from './models/abonnement.model';


export const AbonnementProviders = [
    {
        provide: 'ABONNEMENT_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Abonnements),
        inject: ['DATA_SOURCE'],
    }
]
