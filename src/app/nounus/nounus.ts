import { Injectable } from '@nestjs/common';
import { ProfilNounus } from './models/nounu.model';
import { Medias } from '../media/models/media.model';
import { Preference } from '../Preference/models/preference.model';
import { DataSource } from 'typeorm';
import { Parameter } from '../parameter/models/parameter.model';
import { ProfilParents } from '../parent/models/parent.model';

export const NounusProviders = [
  {
    provide: 'NOUNUS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ProfilNounus),
    inject: ['DATA_SOURCE'],
  },
];
