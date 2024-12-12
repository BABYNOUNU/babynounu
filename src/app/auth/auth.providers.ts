import { DataSource } from 'typeorm';
import { User } from '../user/user.model';
import { Nounus } from '../nounu/models/nounu.model';
import { SettingTypeProfil } from '../setting/models/setting_type_profil.model';
import { Parents } from '../parent/models/parent.model';

export const AuthProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'NOUNU_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Nounus),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'PARENT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Parents),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'TYPE_PROFIL_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(SettingTypeProfil),
    inject: ['DATA_SOURCE'],
  },
];