import { DataSource } from 'typeorm';

export const isProd:boolean = process.env.NODE_ENV === 'production';
export const HOST = isProd ? process.env.API_URL || 'https://api.babynounu.com' : `${process.env.HOST_URL_LOCAL || 'http://localhost'}:3002`;
export const WS_HOST = isProd ? 'https://api.babynounu.com' : process.env.FRONTEND_URL;

// DATABASE PROVIDER
const ProdDatabase = (dbProd:string, dbTest:string) => {
  return isProd ? dbProd : dbTest; 
}

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      // Utilisation explicite des variables d'environnement locales en mode développement
      const host = isProd ? process.env.DB_HOST : 'localhost';
      const username = isProd ? process.env.DB_USERNAME : 'root';
      const password = isProd ? process.env.DB_PASSWORD : '';
      const database = isProd ? process.env.DB_DATABASE : 'db_babynounu';
      
      console.log(`Connexion à la base de données: ${host} avec l'utilisateur ${username}`);
      
      const dataSource = new DataSource({
        type: 'mysql',
        host,
        port: 3306,
        username,
        password,
        database,
        entities: [
            __dirname + '/../**/*.model{.ts,.js}',
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];

