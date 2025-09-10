import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getTypeOrmConfig } from '../config/typeorm.config';
import { databaseProviders } from './database.providers';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => getTypeOrmConfig(configService),
      inject: [ConfigService],
    }),
  ],
  providers: [...databaseProviders],
  exports: [TypeOrmModule, ...databaseProviders],
})
export class DatabaseModule {}