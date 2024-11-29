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
} from '@nestjs/common';
import { NounuService } from './nounu.service';
import { CreateNounuDto } from './dto/create-nounu.dto';
import { UpdateNounuDto } from './dto/update-nounu.dto';

import { ApiTags } from '@nestjs/swagger';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@ApiTags('Nounu')
@Controller('nounu')
export class NounuController {
  constructor(private readonly nounuService: NounuService) {}

  @UseInterceptors(AnyFilesInterceptor({storage}))
  @Post('create')
  async create(@Body() createNounuDto: CreateNounuDto, @UploadedFiles() files: Array<Express.Multer.File>) {
    return this.nounuService.create(createNounuDto, files);
  }

  @Get()
  async findAll() {
    return this.nounuService.findAll();
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
