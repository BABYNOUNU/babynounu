import { DataSource } from 'typeorm';
import { User } from '../user/user.model';
import { ProfilParents } from '../parent/models/parent.model';
import { Parameter } from '../parameter/models/parameter.model';

export const AuthProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'PARENT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ProfilParents),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'PARAMETER_PROFILE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Parameter),
    inject: ['DATA_SOURCE'],
  },
];