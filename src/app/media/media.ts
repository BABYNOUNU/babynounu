import { Injectable } from '@nestjs/common';
import { Medias } from './models/media.model';
import { DataSource } from 'typeorm';
import { Parameter } from '../parameter/models/parameter.model';
import { Preference } from '../Preference/models/preference.model';
import { ProfilNounus } from '../nounus/models/nounu.model';
import { ProfilParents } from '../parent/models/parent.model';


export const MediaProviders = [
    {
        provide: 'MEDIA_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Medias),
        inject: ['DATA_SOURCE'],
    }
]
