import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    UsePipes,
    ValidationPipe,
    NotFoundException,
  } from '@nestjs/common';
  import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
  import { JobsService } from './job.service';
  import { CreateJobDto } from './dtos/create-job.dto';
  import { UpdateJobDto } from './dtos/update-job.dto';
  
  @ApiTags('jobs') // Tag pour Swagger
  @Controller('jobs')
  export class JobsController {
    constructor(private readonly jobsService: JobsService) {}
  
    @Post()
    @ApiOperation({ summary: 'Create a new job posting' })
    @ApiBody({ type: CreateJobDto }) // Schéma du corps de la requête
    @ApiResponse({ status: 201, description: 'Job created successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @UsePipes(new ValidationPipe())
    async createJob(@Body() createJobDto: CreateJobDto) {
      return this.jobsService.createJob(createJobDto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Get all job postings' })
    @ApiResponse({ status: 200, description: 'Jobs retrieved successfully' })
    async findAllJobs() {
      return this.jobsService.findAllJobs();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get a job posting by ID' })
    @ApiParam({ name: 'id', type: Number }) // Paramètre de route
    @ApiResponse({ status: 200, description: 'Job retrieved successfully' })
    @ApiResponse({ status: 404, description: 'Job not found' })
    async findJobById(@Param('id') id: number) {
      return this.jobsService.findJobById(id);
    }
  
    @Patch(':id')
    @ApiOperation({ summary: 'Update a job posting' })
    @ApiParam({ name: 'id', type: Number }) // Paramètre de route
    @ApiBody({ type: UpdateJobDto }) // Schéma du corps de la requête
    @ApiResponse({ status: 200, description: 'Job updated successfully' })
    @ApiResponse({ status: 404, description: 'Job not found' })
    @UsePipes(new ValidationPipe())
    async updateJob(@Param('id') id: number, @Body() updateJobDto: UpdateJobDto) {
      return this.jobsService.updateJob(id, updateJobDto);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a job posting' })
    @ApiParam({ name: 'id', type: Number }) // Paramètre de route
    @ApiResponse({ status: 200, description: 'Job deleted successfully' })
    @ApiResponse({ status: 404, description: 'Job not found' })
    async deleteJob(@Param('id') id: number) {
      return this.jobsService.deleteJob(id);
    }
  }