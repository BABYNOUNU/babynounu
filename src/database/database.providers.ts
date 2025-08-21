import { animationFrameScheduler } from 'rxjs';
import { DataSource } from 'typeorm';

export const isProd:boolean = true;
export const HOST = isProd ? 'https://api.babynounu.com' : 'http://localhost:3000';
export const WS_HOST = isProd ? 'https://api.babynounu.com' : process.env.FRONTEND_URL;

// DATABASE PROVIDER
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