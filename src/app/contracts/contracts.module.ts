import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractsController } from './contracts.controller';
import { ContractsService } from './contracts.service';
import { NotificationService } from '../notification/notification.service';
import { NounusService } from '../nounus/nounus.service';
import { MediaService } from '../media/media.service';
import { ParameterService } from '../parameter/parameter.service';
import { Contracts } from './models/contracts.model';
import { ProfilNounus } from '../nounus/models/nounu.model';
import { ProfilParents } from '../parent/models/parent.model';
import { Notification } from '../notification/models/notification.model';
import { Medias } from '../media/models/media.model';
import { Parameter } from '../parameter/models/parameter.model';
import { Preference } from '../Preference/models/preference.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Contracts,
      ProfilNounus,
      ProfilParents,
      Notification,
      Medias,
      Parameter,
      Preference
    ])
  ],
  controllers: [ContractsController],
  providers: [
    ContractsService,
    NotificationService,
    NounusService,
    MediaService,
    ParameterService
  ],
  exports: [ContractsService, TypeOrmModule]
})
export class ContractsModule {}
