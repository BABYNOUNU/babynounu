import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsController } from './job.controller';
import { JobsService } from './job.service';
import { Job } from './models/job.model';
import { Preference } from '../Preference/models/preference.model';
import { Medias } from '../media/models/media.model';
import { Parameter } from '../parameter/models/parameter.model';
import { MediaService } from '../media/media.service';
import { ParameterService } from '../parameter/parameter.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Job,
      Preference,
      Medias,
      Parameter
    ])
  ],
  controllers: [JobsController],
  providers: [JobsService, MediaService, ParameterService],
  exports: [JobsService, TypeOrmModule]
})
export class JobModule {}
