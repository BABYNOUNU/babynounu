import { Module } from '@nestjs/common';
import { ParentController } from './parent.controller';
import { ParentsService } from './parent.service';
import { ParentProviders } from './parent.provider';
import { DatabaseModule } from 'src/database/database.module';
import { MediaService } from '../media/media.service';
import { ParameterService } from '../parameter/parameter.service';
import { NounusService } from '../nounus/nounus.service';
import { PreferenceService } from '../Preference/preference.service';
import { PreferenceProvider } from '../Preference/preference';
import { MediaProviders } from '../media/media';
import { ParameterProviders } from '../parameter/parameter';
import { NounusProviders } from '../nounus/nounus';

@Module({
  imports: [DatabaseModule],
  controllers: [ParentController],
  providers: [
    ParentsService,
    MediaService,
    ParameterService,
    NounusService,
    ...ParentProviders,
    ...MediaProviders,
    ...PreferenceProvider,
    ...ParameterProviders,
    ...NounusProviders
  ],
})
export class ParentModule {}
