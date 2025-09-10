import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NounusController } from './nounus.controller';
import { NounusService } from './nounus.service';
import { ParameterService } from '../parameter/parameter.service';
import { ParentsService } from '../parent/parent.service';
import { PreferenceService } from '../Preference/preference.service';
import { MediaService } from './../media/media.service';
import { NotificationService } from '../notification/notification.service';
import { ProfilNounus } from './models/nounu.model';
import { Medias } from '../media/models/media.model';
import { Preference } from '../Preference/models/preference.model';
import { Parameter } from '../parameter/models/parameter.model';
import { ProfilParents } from '../parent/models/parent.model';
import { Notification } from '../notification/models/notification.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProfilNounus,
      Medias,
      Preference,
      Parameter,
      ProfilParents,
      Notification
    ])
  ],
  controllers: [NounusController],
  providers: [
    NounusService,
    ParentsService,
    ParameterService,
    MediaService,
    NotificationService,
    PreferenceService
  ],
  exports: [NounusService, TypeOrmModule]
})
export class NounusModule {}
