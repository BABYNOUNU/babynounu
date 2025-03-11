import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    NotFoundException,
    UseInterceptors,
    UploadedFiles,
    Query,
  } from '@nestjs/common';
  import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
  import { NounusService } from './nounus.service';
  import { CreateNounuDto } from './dtos/create-nounu.dto';
  import { UpdateNounuDto } from './dtos/update-nounu.dto';
  import { Nounus } from './models/nounu.model';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { storageMedia } from 'src/config/media.config';
import { SearchNounuCriteriaDto } from './dtos/search-nounu-criteria.dto';
  
  @ApiTags('nounu') // Tag pour Swagger
  @Controller('nounu')
  export class NounusController {
    constructor(private readonly nounuService: NounusService) {}
  
      @Post('create')
      @UseInterceptors(
          FileFieldsInterceptor(
            [
              { name: 'imageNounu', maxCount: 1 },
              { name: 'documents', maxCount: 4 },
              { name: 'gallery', maxCount: 20 },
            ],
            {
              storage: storageMedia
            }
          )
        )
    @ApiOperation({ summary: 'Create a new Nounus' })
    @ApiResponse({ status: 201, description: 'Nounus created successfully', type: Nounus })
    async create(@Body() createNounuDto: CreateNounuDto, @UploadedFiles() files): Promise<Nounus> {
      return await this.nounuService.create(createNounuDto, files);
    }
  
    @Get()
    @ApiOperation({ summary: 'Get all Nounus' })
    @ApiResponse({ status: 200, description: 'List of Nounus', type: [Nounus] })
    async findAll(@Query() userId: string): Promise<Nounus[]> {
      return await this.nounuService.findAll(userId);
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get a Nounus by ID' })
    @ApiParam({ name: 'id', description: 'Nounus ID', type: Number })
    @ApiResponse({ status: 200, description: 'Nounus found', type: Nounus })
    @ApiResponse({ status: 404, description: 'Nounus not found' })
    async findOne(@Param('id') id: number): Promise<Nounus> {
      return await this.nounuService.findOne(id);
    }
  
    @Post('update/:id')
    @UseInterceptors(
      FileFieldsInterceptor(
        [
          { name: 'imageNounu', maxCount: 1 },
          { name: 'documents', maxCount: 4 },
          { name: 'gallery', maxCount: 20 },
        ],
        {
          storage: storageMedia
        }
      )
    )
    @ApiOperation({ summary: 'Update a Nounus by ID' })
    @ApiParam({ name: 'id', description: 'Nounus ID', type: Number })
    @ApiResponse({ status: 200, description: 'Nounus updated successfully', type: Nounus })
    @ApiResponse({ status: 404, description: 'Nounus not found' })
    async update(
      @Param('id') id: string,
      @Body() updateNounuDto: UpdateNounuDto, @UploadedFiles() files
    ): Promise<Nounus> {
      return await this.nounuService.update(id, updateNounuDto, files);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a Nounus by ID' })
    @ApiParam({ name: 'id', description: 'Nounus ID', type: Number })
    @ApiResponse({ status: 204, description: 'Nounus deleted successfully' })
    @ApiResponse({ status: 404, description: 'Nounus not found' })
    async remove(@Param('id') id: number): Promise<void> {
      return await this.nounuService.remove(id);
    }

    @Post('search')
async searchNounu(@Body() searchCriteria: SearchNounuCriteriaDto) {
  return this.nounuService.search(searchCriteria);
}
  }