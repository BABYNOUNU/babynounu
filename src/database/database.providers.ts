import { env } from 'process';
import { DataSource } from 'typeorm';

const isProd:boolean = true
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
        username: ProdDatabase(env.DB_USERNAME, env.DB_USERNAME_LOCAL),
        password: ProdDatabase(env.DB_PASSWORD, env.DB_PASSWORD_LOCAL),
        database: ProdDatabase(env.DB_DATABASE, env.DB_DATABASE_LOCAL),
        entities: [
            __dirname + '/../**/*.model{.ts,.js}',
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];