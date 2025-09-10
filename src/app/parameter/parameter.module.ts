import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParameterController } from './parameter.controller';
import { ParameterService } from './parameter.service';
import { Parameter } from './models/parameter.model';
import { Medias } from '../media/models/media.model';
import { MediaService } from '../media/media.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Parameter,
      Medias
    ])
  ],
  controllers: [ParameterController],
  providers: [ParameterService],
  exports: [ParameterService, TypeOrmModule]
})
export class ParameterModule {}
