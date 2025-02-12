import { Module } from '@nestjs/common';
import { JobsController } from './job.controller';
import { JobsService } from './job.service';
import { JobProviders } from './job';
import { DatabaseModule } from 'src/database/database.module';
import { MediaService } from '../media/media.service';
import { MediaProviders } from '../media/media';
import { ParameterProviders } from '../parameter/parameter';
import { ParameterService } from '../parameter/parameter.service';

@Module({
  imports: [DatabaseModule],
  controllers: [JobsController],
  providers: [JobsService, MediaService, ParameterService, ...MediaProviders, ...ParameterProviders, ...JobProviders]
})
export class JobModule {}
