import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
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
import { SharpTransform } from 'src/utils/sharpTransform';
import { GetUser } from '../auth/getUser';
import { User } from '../user/user.model';

@ApiTags('ProfilParents')
@Controller('parent')
export class ParentController {
  constructor(private readonly parentService: ParentsService) {}

  // Get All ProfilParents
  @Get('')
  GetParents(@Query('page') page: number, @Query('limit') limit: number, @Query('userId') userId: string) {
    return this.parentService.findAll(userId, page, limit);
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
    SharpTransform({
      fields: ['imageParent'],
      resizeOptions: { width: 400, height: 400, fit: 'cover', quality: 80 },
    }), // Intercepteur personnalisé,
  )
  async Create(
    @Body() createParentDto: CreateParentDto,
    @UploadedFiles() files,
  ) {
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
    @Param('id') id: string,
    @Body() updateParentDto: UpdateParentDto,
    @UploadedFiles() files,
  ) {
    return this.parentService.update(id, updateParentDto, files);
  }

  // // Delete parent existing
  @Delete('/delete/:id')
  DeleteParent(@Param('id') id: number) {
    this.parentService.remove(id.toString());
  }

  @Post('search_parent')
  async searchParent(@Body() searchCriteria: SearchParentCriteriaDto, @Query('page') page: number, @Query('limit') limit: number) {
    return this.parentService.search(searchCriteria);
  }
}
