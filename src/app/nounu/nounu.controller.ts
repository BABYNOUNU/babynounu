import { storage } from './../../config/media.config';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UploadedFiles,
  UseInterceptors,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { NounuService } from './nounu.service';
import { CreateNounuDto } from './dto/create-nounu.dto';
import { UpdateNounuDto } from './dto/update-nounu.dto';

import { ApiTags } from '@nestjs/swagger';
import { AnyFilesInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/auh.guard';
import { query } from 'express';

@ApiTags('Nounu')
@Controller('nounu')
export class NounuController {
  constructor(private readonly nounuService: NounuService) {}

  @UseInterceptors(FileFieldsInterceptor([
    { name: 'profil_image', maxCount: 1 },
    { name: 'document', maxCount: 5 },
    { name: 'gallery', maxCount: 10 },
  ], { storage, limits: { fileSize: 10 * 1024 * 1024 }, }))
  @Post('create')
  async create(@Body() createNounuDto: CreateNounuDto, @UploadedFiles() files: {
    profil_image?: Express.Multer.File[];
    document?: Express.Multer.File[];
    gallery?: Express.Multer.File[];
  }) {
    return this.nounuService.create(createNounuDto, files);
  }

  
  @Get()
  async findAll(@Query('userId') userId: string) {
    return this.nounuService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.nounuService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateNounuDto: UpdateNounuDto,
  ) {
    return this.nounuService.update(id, updateNounuDto);
  }

  @Delete('update/:id')
  async remove(@Param('id') id: string) {
    return this.nounuService.remove(id);
  }
}
