import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ParentService } from './parent.service';
import { CreateParentDto } from './dto/create-parent.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { storage } from './../../config/media.config';

@ApiTags('Parents')
@Controller('parent')
export class ParentController {
  constructor(private readonly parentService: ParentService) {}

  // Get All Parents
  @Get('')
  GetParents() {
    this.parentService.Parents();
  }

  // Get Signle Parent
  @Get('/:id')
  GetParent(@Param('id') id: number) {
    return this.parentService.Parent(id);
  }

  // Create new Parent
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'profil_image', maxCount: 1 },
  ], { storage, limits: { fileSize: 10 * 1024 * 1024 }, }))
  @Post('create')
  async Create(@Body() createParentDto: CreateParentDto, @UploadedFiles() files: {
    profil_image?: Express.Multer.File[];
  }) {
    return this.parentService.create(createParentDto, files);
  }

  // Update parent existing
  @Patch('update/:id')
  UpdateParent() {
    this.parentService.UpdateParent();
  }

  // Delete parent existing
  @Delete('/delete/:id')
  DeleteParent(@Param('id') id: number) {
    this.parentService.DeleteParent(id);
  }
}
