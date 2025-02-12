import { Module , Inject } from '@nestjs/common';
import { PreferenceController } from './preference.controller';
import { PreferenceService } from './preference.service';
import { PreferenceProvider } from './preference';
import { DatabaseModule } from 'src/database/database.module';
import { MediaService } from '../media/media.service';
import { NounusService } from '../nounus/nounus.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PreferenceController],
  providers: [PreferenceService, ...PreferenceProvider]
})
export class PreferenceModule {}
