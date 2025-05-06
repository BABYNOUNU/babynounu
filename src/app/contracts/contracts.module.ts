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
import { NounusService } from '../nounus/nounus.service';
import { MediaService } from '../media/media.service';
import { ParameterProviders } from '../parameter/parameter';
import { MediaProviders } from '../media/media';
import { PreferenceProvider } from '../Preference/preference';
import { ParameterService } from '../parameter/parameter.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ContractsController],
  providers: [
    ContractsService,
    NotificationService,
    NounusService,
    MediaService,
    ParameterService,
    ...ParameterProviders,
    ...MediaProviders,
    ...PreferenceProvider,
    ...NounusProviders,
    ...ContractsProviders,
    ...ParentProviders,
    ...NounusProviders,
    ...NotificationProviders,
  ],
})
export class ContractsModule {}
