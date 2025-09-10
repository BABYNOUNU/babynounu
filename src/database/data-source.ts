import { DataSource } from 'typeorm';
import { dataSourceOptions } from '../config/typeorm.config';

// DataSource pour les migrations CLI
export const AppDataSource = new DataSource(dataSourceOptions);

// Initialisation par défaut pour les migrations
if (require.main === module) {
  AppDataSource.initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization:', err);
    });
}