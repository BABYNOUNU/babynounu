import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Medias } from './models/media.model';

@Injectable()
export class MediaService {
  constructor(
    
  ) {}

  async createMedia(media: any, mediaRepository:any) {
    const newMedia = mediaRepository.create({
      url: media.url,
      media_nounu: media.media_nounu,
    });
    return mediaRepository.save(newMedia);
  }
}
