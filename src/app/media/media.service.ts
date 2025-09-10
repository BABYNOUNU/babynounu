import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medias } from './models/media.model';
import { CreateMediaDto } from './dtos/create-media.dto';
import { UpdateMediaDto } from './dtos/update-media.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { ParameterService } from '../parameter/parameter.service';
import { HOST } from 'src/database/database.providers';
import { NounusService } from '../nounus/nounus.service';
import axios from 'axios';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Medias)
    private readonly mediaRepository: Repository<Medias>,
    private readonly parameterService: ParameterService,
    // private readonly nounusService: NounusService,
  ) {}

  async create(createMediaDto: CreateMediaDto): Promise<Medias> {
    const newMedia = this.mediaRepository.create({
      ...createMediaDto,
      type_media: await this.parameterService.findOneBySlug(
        createMediaDto.typeMedia,
      ),
      [createMediaDto.userId ? 'user' : 'job']: {
        id: createMediaDto.userId
          ? createMediaDto.userId
          : createMediaDto.JobId,
      },
    });
    const savedMedia = await this.mediaRepository.save(newMedia);

    // Add image processing job to the queue

    return savedMedia;
  }

  async createDocumentByNounu(userId: string, files: any): Promise<any> {
    try {
      let Media;
      if (files.documents?.length > 0) {
        for (const file of files.documents) {
          Media = await this.create({
            originalName: file.originalname,
            filename: file.filename,
            path: file.path,
            originalUrl: `${HOST}/uploads/${file.filename}`,
            typeMedia: 'document-verification',
            userId: userId,
          });
        }

        if (!Media) {
          throw new Error('Failed to create media document');
        }
        
        return {
          success: true,
          message: 'Document created for nounu',
          data: Media,
        };
      }

      return { success: false, message: 'No documents uploaded' };
    } catch (error) {
      throw new Error(`Failed to create document for nounu: ${error.message}`);
    }
  }

  // ... other methods (findAll, findOne, update, remove)
  async findOne(id: number): Promise<Medias | undefined> {
    return this.mediaRepository.findOne({ where: { id: id.toString() } });
  }

  async findAll(): Promise<Medias[]> {
    return this.mediaRepository.find();
  }

  async findDocumentByUserId(userId: string): Promise<Medias[]> {
    try {
      const documents = await this.mediaRepository.find({
        where: {
          type_media: { slug: 'document-verification' },
          user: { id: userId },
        },
      });
      return documents;
    } catch (error) {
      throw new Error(`Failed to find documents for user: ${error.message}`);
    }
  }

  async findImageByUserId(userId: string): Promise<Medias[]> {
    try {
      const documents = await this.mediaRepository.find({
        where: {
          type_media: { slug: 'image-profil' },
          user: { id: userId },
        },
      });
      return documents;
    } catch (error) {
      throw new Error(`Failed to find documents for user: ${error.message}`);
    }
  }

  async getGalleryNounus(userId: any): Promise<Medias[]> {
    try {
      const NounuMedias = await this.mediaRepository.find({
        where: {
          type_media: { slug: 'gallery-image' },
          user: {
            nounu: {
              id: userId,
            },
          },
        },
      });
      return NounuMedias;
    } catch (error) {
      console.log(error);
      throw new Error('Error while fetching gallery nounus');
    }
  }

  async update(
    { id, typeMedia }: { id: string; typeMedia: string },
    updateMediaDto: UpdateMediaDto,
  ): Promise<Medias | undefined> {
    const media = await this.mediaRepository.find({
      where: { user: { id }, type_media: { slug: typeMedia } },
    });

    if (!media) {
      throw new Error('Media not found');
    }

    for (let i = 0; i < media.length; i++) {
      const el = media[i];
      await this.mediaRepository.update(el.id, updateMediaDto);
    }

    return this.findOne(+id); // Return the updated entity
  }

  async deleteMany({
    userId,
    typeMedia,
  }: {
    userId: string;
    typeMedia: string;
  }): Promise<void> {
    await this.mediaRepository.delete({
      user: { id: userId },
      type_media: { slug: typeMedia },
    });
  }

  async deleteManyJob({
    JobId,
    typeMedia,
  }: {
    JobId: string;
    typeMedia: string;
  }): Promise<void> {
    await this.mediaRepository.delete({
      job: { id: +JobId },
      type_media: { slug: typeMedia },
    });
  }

  async remove(id: string): Promise<Medias> {
    const media = await this.mediaRepository.findOne({
      where: { id: id.toString() },
    });

    if (!media) {
      throw new Error('Media not found');
    }
    await this.mediaRepository.delete(id);
    return media;
  }
}
