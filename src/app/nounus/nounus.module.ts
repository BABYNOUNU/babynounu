import { MediaService } from './../media/media.service';
import { Module } from '@nestjs/common';
import { NounusController } from './nounus.controller';
import { NounusService } from './nounus.service';
import { NounusProviders } from './nounus';
import { DatabaseModule } from 'src/database/database.module';
import { ParameterService } from '../parameter/parameter.service';
import { ParentsService } from '../parent/parent.service';
import { PreferenceService } from '../Preference/preference.service';
import { PreferenceProvider } from '../Preference/preference';
import { ParentProviders } from '../parent/parent.provider';
import { MediaProviders } from '../media/media';
import { ParameterProviders } from '../parameter/parameter';
import { NotificationService } from '../notification/notification.service';
import { NotificationProviders } from '../notification/notification';

@Module({
  imports: [DatabaseModule],
  controllers: [NounusController],
  providers: [
    NounusService,
    ParentsService,
    ParameterService,
    MediaService,
    NotificationService,
    ...NotificationProviders,
    ...ParentProviders,
    ...ParameterProviders,
    ...PreferenceProvider,
    ...MediaProviders,
    ...NounusProviders,
  ],
})
export class NounusModule {}
