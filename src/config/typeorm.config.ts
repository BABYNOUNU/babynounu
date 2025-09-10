import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { join } from 'path';

// Configuration pour l'environnement de production/développement
export const getTypeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => {
  const isProd = configService.get<string>('NODE_ENV') === 'production';
  
  // Utilisation explicite des variables d'environnement locales en mode développement
  const host = isProd ? configService.get<string>('DB_HOST') : 'localhost';
  const username = isProd ? configService.get<string>('DB_USERNAME') : 'root';
  const password = isProd ? configService.get<string>('DB_PASSWORD') : '';
  const database = isProd ? configService.get<string>('DB_DATABASE') : 'db_babynounu';
  
  console.log(`[TypeORM Config] Connexion à la base de données: ${host} avec l'utilisateur ${username}`);
  
  return {
    type: 'mysql',
    host,
    port: configService.get<number>('DB_PORT', 3306),
    username,
    password,
    database,
    
    // Configuration moderne des entités
    entities: [join(__dirname, '..', 'app', '**', '*.model{.ts,.js}')],
    autoLoadEntities: true,
    
    // Configuration de synchronisation automatique (remplace les migrations)
    synchronize: true, // Active la synchronisation automatique
    dropSchema: false, // Ne supprime pas le schéma existant
    
    // Configuration du logging
    // logging: isProd ? ['error', 'warn'] : ['query', 'error', 'warn', 'info', 'log'],
    // logger: 'advanced-console',
    
    // Configuration du cache désactivée (Redis non installé)
    cache: false,
    
    // Configuration des pools de connexions
    extra: {
      connectionLimit: 10,
      acquireTimeout: 60000,
      timeout: 60000,
      reconnect: true,
    },
    
    // Configuration SSL pour la production
    ssl: isProd ? {
      rejectUnauthorized: false,
    } : false,
    
    // Configuration des noms de tables
    namingStrategy: undefined, // Utilise la stratégie par défaut
    
    // Configuration du timezone
    timezone: 'Z',
    
    // Configuration des subscribers et listeners
    subscribers: [join(__dirname, '..', 'database', 'subscribers', '*{.ts,.js}')],
    
    // Retry logic
    retryAttempts: 3,
    retryDelay: 3000,
  };
};

// Configuration pour les migrations CLI
export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || process.env.DB_USERNAME_LOCAL,
  password: process.env.DB_PASSWORD || process.env.DB_PASSWORD_LOCAL,
  database: process.env.DB_DATABASE || process.env.DB_DATABASE_LOCAL,
  entities: [join(__dirname, '..', 'app', '**', '*.model{.ts,.js}')],
  migrations: [join(__dirname, '..', 'database', 'migrations', '*{.ts,.js}')],
  subscribers: [join(__dirname, '..', 'database', 'subscribers', '*{.ts,.js}')],
  synchronize: false,
  migrationsRun: false,
};