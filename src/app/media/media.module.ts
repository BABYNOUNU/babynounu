import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { Media } from './media';

@Module({
  controllers: [MediaController],
  providers: [MediaService, Media]
})
export class MediaModule {}
