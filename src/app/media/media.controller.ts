import { MediaService } from './media.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UploadedFiles,
} from '@nestjs/common';
import { CreateMediaDto } from './dtos/create-media.dto';
import { UpdateMediaDto } from './dtos/update-media.dto';
import {
  ApiTags,
  ApiConsumes,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'; // For local file storage
import { extname } from 'path';
import { Medias } from './models/media.model';
import { In } from 'typeorm';
import { fileFilterMedia, LimiterMedia, storageMedia } from 'src/config/media.config';

@ApiTags('media')
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
      ],
      {
        storage: storageMedia,
        fileFilter: fileFilterMedia,
        limits: LimiterMedia
      }
    )
  )
  create(
    @Body() createMediaDto: CreateMediaDto,
    @UploadedFiles()
    files: {
      test: Express.Multer.File[];
    },
  ) {
    console.log(createMediaDto, files);
    // const mediaData: CreateMediaDto = {
    //   ...createMediaDto,
    //   originalName: file.originalname,
    //   filename: file.filename,
    //   path: file.path, // or a suitable URL/path
    // };
    // return this.mediaService.create(mediaData);
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

  @Patch(':id')
  @ApiOkResponse({ description: 'Media updated', type: Medias })
  update(@Param('id') id: string, @Body() typeMedia: string, updateMediaDto: UpdateMediaDto) {
    return this.mediaService.update({id, typeMedia}, updateMediaDto);
  }

  @Post(':id')
  @ApiOkResponse({ description: 'Media deleted' })
  remove(@Param('id') id: string) {
    return this.mediaService.remove(id);
  }
}
