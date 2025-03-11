import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ParentsService } from './parent.service';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  fileFilterMedia,
  LimiterMedia,
  storageMedia,
} from 'src/config/media.config';
import { SearchParentCriteriaDto } from './dto/search-parent-criteria.dto';

@ApiTags('Parents')
@Controller('parent')
export class ParentController {
  constructor(private readonly parentService: ParentsService) {}

  // Get All Parents
  @Get('')
  GetParents() {
    console.log('All');
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
    FileFieldsInterceptor([{ name: 'imageParent', maxCount: 4 }], {
      storage: storageMedia,
    }),
  )
  async Create(@Body() createParentDto: CreateParentDto, @UploadedFiles() files) {
    // Appel du service pour sauvegarder les données
    return this.parentService.create(createParentDto, files);
  }

  // Update parent existing
  @Post('update/:id')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'imageParent', maxCount: 4 }], {
      storage: storageMedia,
    }),
  )
  UpdateParent(
    @Param('id') id: number,
    @Body() updateParentDto: UpdateParentDto,
    @UploadedFiles() files,
  ) {
   return this.parentService.update(id.toString(), updateParentDto, files);
  }

  // // Delete parent existing
  @Delete('/delete/:id')
  DeleteParent(@Param('id') id: number) {
    this.parentService.remove(id.toString());
  }


  @Post('search/parent')
async searchParent(@Body() searchCriteria: SearchParentCriteriaDto) {
  return this.parentService.search(searchCriteria);
}
}
