import { animationFrameScheduler } from 'rxjs';
import { DataSource } from 'typeorm';

export const isProd:boolean = false
const ProdDatabase = (dbProd:string, dbTest:string) => {
  return isProd ? dbProd : dbTest;
}

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: ProdDatabase(process.env.DB_USERNAME, process.env.DB_USERNAME_LOCAL),
        password: ProdDatabase(process.env.DB_PASSWORD, process.env.DB_PASSWORD_LOCAL),
        database: ProdDatabase(process.env.DB_DATABASE, process.env.DB_DATABASE_LOCAL),
        entities: [
            __dirname + '/../**/*.model{.ts,.js}',
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];