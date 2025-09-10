import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { Medias } from './models/media.model';
import { Parameter } from '../parameter/models/parameter.model';
import { ParameterService } from '../parameter/parameter.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Medias,
      Parameter
    ])
  ],
  controllers: [MediaController],
  providers: [
    MediaService,
    ParameterService
  ],
  exports: [MediaService, TypeOrmModule]
})
export class MediaModule {}
