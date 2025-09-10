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
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiConsumes } from '@nestjs/swagger';
import { NounusService } from './nounus.service';
import { CreateNounuDto } from './dto/create-nounu.dto';
import { UpdateNounuDto } from './dto/update-nounu.dto';
import { ProfilNounus } from './models/nounu.model';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { storageMedia } from 'src/config/media.config';
import { SearchNounuCriteriaDto } from './dto/search-nounu-criteria.dto';
import { SharpTransform } from 'src/utils/sharpTransform';

@ApiTags('nounu') // Tag pour Swagger
@Controller('nounu')
export class NounusController {
  constructor(private readonly nounuService: NounusService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new ProfilNounus' })
  @ApiResponse({
    status: 201,
    description: 'ProfilNounus created successfully',
    type: ProfilNounus,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'imageNounu', maxCount: 1 },
        { name: 'documents', maxCount: 4 },
        { name: 'gallery', maxCount: 20 },
      ],
      {
        storage: storageMedia,
      },
    ),
    SharpTransform({
      fields: ['imageNounu'],
      resizeOptions: { width: 400, height: 400, fit: 'cover', quality: 80 },
    }), // Intercepteur personnalisé
  )
  async create(
    @UploadedFiles()
    files: any,
    @Body() createProfilNounusDto: CreateNounuDto,
  ): Promise<ProfilNounus> {
    console.log(createProfilNounusDto);
    return await this.nounuService.create(createProfilNounusDto, files);
  }

  @Get()
  @ApiOperation({ summary: 'Get all ProfilNounus' })
  @ApiResponse({
    status: 200,
    description: 'List of ProfilNounus',
    type: [ProfilNounus],
  })
  async findAllNotCurrentUser(
    @Query('userId') userId: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<ProfilNounus[]> {
    return await this.nounuService.findAllNotCurrentUser(userId, page, limit);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all ProfilNounus' })
  @ApiResponse({
    status: 200,
    description: 'List of ProfilNounus',
    type: [ProfilNounus],
  })
  async findAll(): Promise<ProfilNounus[]> {
    return await this.nounuService.findAll();
  }

  @Get('non-certified')
  @ApiOperation({ summary: 'Get all ProfilNounus which are not certified' })
  @ApiResponse({
    status: 200,
    description: 'List of ProfilNounus which are not certified',
    type: [ProfilNounus],
  })
  async getNonCertifiedNounus(): Promise<ProfilNounus[]> {
    console.log('test');
    return await this.nounuService.getNonCertifiedNounus();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a ProfilNounus by ID' })
  @ApiParam({ name: 'id', description: 'ProfilNounus ID', type: Number })
  @ApiResponse({
    status: 200,
    description: 'ProfilNounus found',
    type: ProfilNounus,
  })
  @ApiResponse({ status: 404, description: 'ProfilNounus not found' })
  async findOne(@Param('id') id: string): Promise<ProfilNounus> {
    return await this.nounuService.findOne(id);
  }

  @Post('update-status/:id')
  @ApiOperation({ summary: 'Update status of a ProfilNounus by ID' })
  @ApiParam({ name: 'id', description: 'ProfilNounus ID', type: Number })
  @ApiResponse({
    status: 200,
    description: 'ProfilNounus updated successfully',
  })
  @ApiResponse({ status: 404, description: 'ProfilNounus not found' })
  async updateStatus(
    @Param('id') id: string,
    @Body() { status }: { status: string },
  ): Promise<{ status: string }> {
    return await this.nounuService.updateStatus(id, status);
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
        storage: storageMedia,
      },
    ),
    SharpTransform({
      fields: ['imageNounu'],
      resizeOptions: { width: 400, height: 400, fit: 'cover', quality: 80 },
    }), // Intercepteur personnalisé
  )
  @ApiOperation({ summary: 'Update a ProfilNounus by ID' })
  @ApiParam({ name: 'id', description: 'ProfilNounus ID', type: Number })
  @ApiResponse({
    status: 200,
    description: 'ProfilNounus updated successfully',
    type: ProfilNounus,
  })
  @ApiResponse({ status: 404, description: 'ProfilNounus not found' })
  async update(
    @Param('id') id: string,
    @Body() updateNounuDto: UpdateNounuDto,
    @UploadedFiles() files,
  ): Promise<ProfilNounus> {
    return await this.nounuService.update(id, updateNounuDto, files);
  }

  @Post('approve-certification/:id')
  @ApiOperation({ summary: 'Approve a ProfilNounus by ID' })
  @ApiParam({ name: 'id', description: 'ProfilNounus ID', type: Number })
  @ApiResponse({
    status: 200,
    description: 'ProfilNounus updated successfully',
    type: ProfilNounus,
  })
  @ApiResponse({ status: 404, description: 'ProfilNounus not found' })
  async approveCertification(
    @Param('id') id: string,
  ): Promise<{ certif: 'Approved' | 'Pending' | 'Rejected' }> {
    return await this.nounuService.approveCertification(id);
  }

  @Post('reject-certification/:id')
  @ApiOperation({ summary: 'Reject certification of a ProfilNounus by ID' })
  @ApiParam({ name: 'id', description: 'ProfilNounus ID', type: Number })
  @ApiResponse({
    status: 200,
    description: 'ProfilNounus certification rejected successfully',
    type: ProfilNounus,
  })
  @ApiResponse({ status: 404, description: 'ProfilNounus not found' })
  async rejectCertification(
    @Param('id') id: string,
  ): Promise<{ certif: 'Approved' | 'Pending' | 'Rejected' }> {
    return await this.nounuService.rejectCertification(id);
  }

  @Post('pending-certification/:id')
  @ApiOperation({
    summary: 'Set certification status to pending for a ProfilNounus',
  })
  @ApiParam({ name: 'id', description: 'ProfilNounus ID', type: Number })
  @ApiResponse({
    status: 200,
    description: 'ProfilNounus certification set to pending successfully',
    type: ProfilNounus,
  })
  @ApiResponse({ status: 404, description: 'ProfilNounus not found' })
  async pendingCertification(
    @Param('id') id: string,
  ): Promise<{ certif: 'Approved' | 'Pending' | 'Rejected' }> {
    console.log(id);
    return await this.nounuService.pendingCertification(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a ProfilNounus by ID' })
  @ApiParam({ name: 'id', description: 'ProfilNounus ID', type: Number })
  @ApiResponse({
    status: 204,
    description: 'ProfilNounus deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'ProfilNounus not found' })
  async remove(@Param('id') id: string): Promise<void> {
    return await this.nounuService.remove(id);
  }

  @Post('search')
  async searchNounu(
    @Body() searchCriteria: SearchNounuCriteriaDto,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.nounuService.search(searchCriteria, page, limit);
  }
}
