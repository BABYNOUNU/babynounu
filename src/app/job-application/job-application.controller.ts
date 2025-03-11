import { use } from 'passport';
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { JobApplicationsService } from './job-application.service';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';
import { JobApplication } from './models/job-application.model';
import { JwtAuthGuard } from '../auth/auh.guard';

@ApiTags('Job Applications')
@Controller('job-applications')
export class JobApplicationController {
  constructor(private readonly jobApplicationService: JobApplicationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiOperation({ summary: 'Créer une nouvelle candidature' })
  @ApiResponse({ status: 201, description: 'Candidature créée avec succès.', type: JobApplication })
  create(@Body() createJobApplicationDto: CreateJobApplicationDto, @Req() req) {
    return this.jobApplicationService.create(createJobApplicationDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les candidatures' })
  @ApiResponse({ status: 200, description: 'Liste des candidatures.', type: [JobApplication] })
  findAll() {
    return this.jobApplicationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une candidature par ID' })
  @ApiParam({ name: 'id', description: 'ID de la candidature', example: '1' })
  @ApiResponse({ status: 200, description: 'Détails de la candidature.', type: JobApplication })
  @ApiResponse({ status: 404, description: 'Candidature non trouvée.' })
  findOne(@Param('id') id: string) {
    return this.jobApplicationService.findOne(+id);
  }

  @Put('update/:id')
  @ApiOperation({ summary: 'Mettre à jour une candidature' })
  @ApiParam({ name: 'id', description: 'ID de la candidature', example: '1' })
  @ApiResponse({ status: 200, description: 'Candidature mise à jour.', type: JobApplication })
  @ApiResponse({ status: 404, description: 'Candidature non trouvée.' })
  update(@Param('id') id: string, @Body() updateJobApplicationDto: UpdateJobApplicationDto) {
    return this.jobApplicationService.update(+id, updateJobApplicationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une candidature' })
  @ApiParam({ name: 'id', description: 'ID de la candidature', example: '1' })
  @ApiResponse({ status: 200, description: 'Candidature supprimée.' })
  @ApiResponse({ status: 404, description: 'Candidature non trouvée.' })
  remove(@Param('id') id: string) {
    return this.jobApplicationService.remove(+id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Récupérer les candidatures d\'un utilisateur par ID' })
  @ApiParam({ name: 'userId', description: 'ID de l\'utilisateur', example: '1' })
  @ApiResponse({ status: 200, description: 'Liste des candidatures de l\'utilisateur.', type: [JobApplication] })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé ou aucune candidature.' })
  getJobApplyByUser(@Param('userId') userId: string) {
    return this.jobApplicationService.getJobApplyByUser(userId);
  }

}
