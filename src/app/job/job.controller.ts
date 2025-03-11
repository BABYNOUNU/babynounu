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
    UseGuards,
    Req,
    UploadedFiles,
    UseInterceptors,
  } from '@nestjs/common';
  import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
  import { JobsService } from './job.service';
  import { CreateJobDto } from './dtos/create-job.dto';
  import { UpdateJobDto } from './dtos/update-job.dto';
import { JwtAuthGuard } from '../auth/auh.guard';
import { storageMedia } from 'src/config/media.config';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
  
  @ApiTags('jobs') // Tag pour Swagger
  @Controller('jobs')
  export class JobsController {
    constructor(private readonly jobsService: JobsService) {}
  
    @Post('create')
          @UseInterceptors(
              FileFieldsInterceptor(
                [
                  { name: 'Images_videos', maxCount: 10 },
                ],
                {
                  storage: storageMedia
                }
              )
            )
    @ApiOperation({ summary: 'Create a new job posting' })
    @ApiBody({ type: CreateJobDto }) // Schéma du corps de la requête
    @ApiResponse({ status: 201, description: 'Job created successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @UsePipes(new ValidationPipe())
    async createJob(@Body() createJobDto: CreateJobDto, @UploadedFiles() files) {
      return this.jobsService.createJob(createJobDto, files);
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

    
    @Get('user/:userId')
    @ApiOperation({ summary: 'Get a job posting by ID' })
    @ApiParam({ name: 'id', type: Number }) // Paramètre de route
    @ApiResponse({ status: 200, description: 'Job retrieved successfully' })
    @ApiResponse({ status: 404, description: 'Job not found' })
    async findAllJobByUser(@Param('userId') userId: any) {
      console.log(userId)
      return this.jobsService.findAllJobByUser(userId);
    }
  
    @Post('update/:id')
    @UseInterceptors(
      FileFieldsInterceptor(
        [
          { name: 'Images_videos', maxCount: 10 },
        ],
        {
          storage: storageMedia
        }
      )
    )
    @ApiOperation({ summary: 'Update a job posting' })
    @ApiParam({ name: 'id', type: Number }) // Paramètre de route
    @ApiBody({ type: UpdateJobDto }) // Schéma du corps de la requête
    @ApiResponse({ status: 200, description: 'Job updated successfully' })
    @ApiResponse({ status: 404, description: 'Job not found' })
    @UsePipes(new ValidationPipe())
    async updateJob(@Param('id') id: number, @Body() updateJobDto: UpdateJobDto, @UploadedFiles() files) {
      return this.jobsService.updateJob(id.toString(), updateJobDto, files);
    }
  
    @Post('delete/:id')
    @ApiOperation({ summary: 'Delete a job posting' })
    @ApiParam({ name: 'id', type: Number }) // Paramètre de route
    @ApiResponse({ status: 200, description: 'Job deleted successfully' })
    @ApiResponse({ status: 404, description: 'Job not found' })
    async deleteJob(@Param('id') id: number) {
      return this.jobsService.deleteJob(id);
    }

@Get('job-applications/user/:userId')
@ApiOperation({ summary: 'Get job applications by user ID' })
@ApiParam({ name: 'userId', type: String }) // Paramètre de route
@ApiResponse({ status: 200, description: 'Job applications retrieved successfully' })
@ApiResponse({ status: 404, description: 'User not found or no job applications' })
async getJobApplyByUserId(@Param('userId') userId: string) {
  return this.jobsService.getJobApplyByUserId(userId);
}

  }