import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Medias } from '../media/models/media.model';
import { User } from '../user/user.model';
import { Preference } from '../Preference/models/preference.model';
import { Nounus } from '../nounus/models/nounu.model';
import { Parameter } from '../parameter/models/parameter.model';
import { Parents } from './models/parent.model';

export const ParentProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },

  {
    provide: 'MEDIA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Medias),
    inject: ['DATA_SOURCE'],
  }
];
