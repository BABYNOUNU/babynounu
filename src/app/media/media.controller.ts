import { MediaService } from './media.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { CreateMediaDto } from './dtos/create-media.dto';
import { UpdateMediaDto } from './dtos/update-media.dto';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { Medias } from './models/media.model';
import {
  fileFilterMedia,
  LimiterMedia,
  storageMedia,
} from 'src/config/media.config';

@ApiTags('medias')
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('create')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'test', maxCount: 4 },
        { name: 'image_2', maxCount: 1 },
        { name: 'image_3', maxCount: 1 },
        { name: 'image_4', maxCount: 1 },
        { name: 'documents', maxCount: 5 },
      ],
      {
        storage: storageMedia,
        fileFilter: fileFilterMedia,
        limits: LimiterMedia,
      },
    ),
  )
  create(
    @Body() createMediaDto: CreateMediaDto,
    @UploadedFiles()
    files: {
      test: Express.Multer.File[];
    },
  ) {
    // const mediaData: CreateMediaDto = {
    //   ...createMediaDto,
    //   originalName: file.originalname,
    //   filename: file.filename,
    //   path: file.path, // or a suitable URL/path
    // };
    // return this.mediaService.create(mediaData);
  }

  @Post('document/:userId')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'documents', maxCount: 5 }], {
      storage: storageMedia,
      fileFilter: fileFilterMedia,
      limits: LimiterMedia,
    }),
  )
  @ApiOkResponse({ description: 'Document created for nounu', type: Medias })
  createDocumentByNounu(
    @Param('userId') userId: string,
    @UploadedFiles()
    files: any,
  ) {
    return this.mediaService.createDocumentByNounu(userId, files);
  }



@Get('document/:userId')
@ApiOkResponse({
  description: 'Get document by user ID',
  type: Medias
})
findDocumentByUserId(@Param('userId') userId: string) {
  return this.mediaService.findDocumentByUserId(userId);
}

  @Get()
  @ApiOkResponse({ description: 'List of media', type: [Medias] })
  findAll() {
    return this.mediaService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Media by ID', type: Medias })
  findOne(@Param('id') id: string) {
    return this.mediaService.findOne(+id);
  }

  @Get('gallery/:userId')
  @ApiOkResponse({
    description: 'List of gallery media by user ID',
    type: [Medias],
  })
  getGalleryNounus(@Param('userId') userId: string) {
    return this.mediaService.getGalleryNounus(userId);
  }

  @Get('documents/:userId')
  @ApiOkResponse({
    description: 'List of gallery media by user ID',
    type: [Medias],
  })
  getDocumentNounus(@Param('userId') userId: string) {
    return this.mediaService.getGalleryNounus(userId);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Media updated', type: Medias })
  update(
    @Param('id') id: string,
    @Body() typeMedia: string,
    updateMediaDto: UpdateMediaDto,
  ) {
    return this.mediaService.update({ id, typeMedia }, updateMediaDto);
  }

  @Post(':id')
  @ApiOkResponse({ description: 'Media deleted' })
  remove(@Param('id') id: string) {
    return this.mediaService.remove(id);
  }
}
