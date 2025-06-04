import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Paiements } from '../paiement/models/paiement.model';
import { Notification } from '../notification/models/notification.model';
import { UpdateApp } from './models/updateApp.model';


export const AdministrateurProviders = [
    {
        provide: 'ADMINISTRATEUR_APP_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(UpdateApp),
        inject: ['DATA_SOURCE'],
    },  
]
