import { DataSource } from 'typeorm';
import { Parents } from './models/parent.model';

export const ParentProviders = [
  {
    provide: 'PARENT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Parents),
    inject: ['DATA_SOURCE'],
  },
];