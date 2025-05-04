import { Module } from '@nestjs/common';
import { ContractsController } from './contracts.controller';
import { ContractsService } from './contracts.service';
import { ContractsProviders } from './contracts';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilNounus } from '../nounus/models/nounu.model';
import { ProfilParents } from '../parent/models/parent.model';
import { DatabaseModule } from 'src/database/database.module';
import { DataSource } from 'typeorm';
import { ParentProviders } from '../parent/parent';
import { NounusProviders } from '../nounus/nounus';
import { NotificationService } from '../notification/notification.service';
import { NotificationProviders } from '../notification/notification';

@Module({
  imports: [DatabaseModule],
  controllers: [ContractsController],
  providers: [
    ContractsService,
    NotificationService,
    ...ContractsProviders,
    ...ParentProviders,
    ...NounusProviders,
    ...NotificationProviders
  ],
})
export class ContractsModule {}
