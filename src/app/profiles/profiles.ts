import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Profile } from './models/profile.model';
import { Preference } from '../Preference/models/preference.model';
import { Parameter } from '../parameter/models/parameter.model';
import { User } from '../user/user.model';

export const ProfileProviders = [
  {
    provide: 'PROFILE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Profile),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'PARAMETER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Parameter),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'PREFERENCE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Preference),
    inject: ['DATA_SOURCE'],
  },
];
