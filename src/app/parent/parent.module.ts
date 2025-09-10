import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParentController } from './parent.controller';
import { ParentsService } from './parent.service';
import { ProfilParents } from './models/parent.model';
import { Preference } from '../Preference/models/preference.model';
import { Medias } from '../media/models/media.model';
import { Parameter } from '../parameter/models/parameter.model';
import { ProfilNounus } from '../nounus/models/nounu.model';
import { Notification } from '../notification/models/notification.model';
import { MediaService } from '../media/media.service';
import { ParameterService } from '../parameter/parameter.service';
import { NounusService } from '../nounus/nounus.service';
import { PreferenceService } from '../Preference/preference.service';
import { NotificationService } from '../notification/notification.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProfilParents,
      Preference,
      Medias,
      Parameter,
      ProfilNounus,
      Notification
    ])
  ],
  controllers: [ParentController],
  providers: [
    ParentsService,
    MediaService,
    ParameterService,
    NounusService,
    PreferenceService,
    NotificationService
  ],
  exports: [ParentsService, TypeOrmModule]
})
export class ParentModule {}
