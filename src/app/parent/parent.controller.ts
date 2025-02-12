import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ParentsService } from './parent.service';
import { CreateParentDto } from './dto/create-parent.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { fileFilterMedia, LimiterMedia, storageMedia } from 'src/config/media.config';

@ApiTags('Parents')
@Controller('parent')
export class ParentController {
  constructor(private readonly parentService: ParentsService) {}

  // Get All Parents
  @Get('')
  GetParents() {
    console.log('All')
    this.parentService.findAll();
  }

  // Get Signle Parent
  @Get('/:id')
  GetParent(@Param('id') id: string) {
    return this.parentService.findOne(id);
  }

  // Create new Parent
  @Post('create')
  @UseInterceptors(
      FileFieldsInterceptor(
        [
          { name: 'imageParent', maxCount: 4 }
        ],
        {
          storage: storageMedia
        }
      )
    )
  async Create(@Body() createParentDto: any, @UploadedFiles() files) {
    // Appel du service pour sauvegarder les données
    return this.parentService.create(createParentDto, files);
  }

  // Update parent existing
  // @Patch('update/:id')
  // UpdateParent() {
  //   this.parentService.UpdateParent();
  // }

  // // Delete parent existing
  // @Delete('/delete/:id')
  // DeleteParent(@Param('id') id: number) {
  //   this.parentService.DeleteParent(id);
  // }
}
