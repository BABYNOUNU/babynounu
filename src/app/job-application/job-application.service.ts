// src/job-applications/job-applications.service.ts

import { Injectable, NotFoundException, Inject } from '@nestjs/common';

import { Repository } from 'typeorm';
import { JobApplication } from './models/job-application.model';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';
import { User } from '../user/user.model';
import { Job } from '../job/models/job.model';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class JobApplicationsService {
  constructor(
    @Inject('JOB_APPLICATION_REPOSITORY')
    private readonly jobApplicationRepository: Repository<JobApplication>,
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
    @Inject('JOB_REPOSITORY')
    private readonly jobRepository: Repository<Job>,
    private readonly notificationService: NotificationService,
  ) {}

  async findAll(): Promise<JobApplication[]> {
    return this.jobApplicationRepository.find({ relations: ['user', 'job'] });
  }

  async findOne(id: number): Promise<JobApplication> {
    const jobApplication = await this.jobApplicationRepository.findOne({
      where: { id },
      relations: ['user', 'job'],
    });

    if (!jobApplication) {
      throw new NotFoundException(`JobApplication with ID ${id} not found`);
    }

    return jobApplication;
  }

  async create(
    createJobApplicationDto: CreateJobApplicationDto, userId
  ): Promise<JobApplication> {
    const isApplyExist = await this.jobApplicationRepository.findOne({
      where: {
        user: { id: createJobApplicationDto.userId.toString() },
        jobs: { id: createJobApplicationDto.jobId },
      },
    });

    if (isApplyExist) {
      const isApply = isApplyExist.is_apply ? false : true
      const updateJobApply = await this.jobApplicationRepository.update(
        { id: isApplyExist.id },
        {
          is_apply: isApply,
          user: { id: createJobApplicationDto.userId.toString() },
          jobs: { id: createJobApplicationDto.jobId },
        },
      );
       isApplyExist.is_apply = isApply;
      return isApplyExist;
    }


    const jobApplication = this.jobApplicationRepository.create({
      is_apply: true,
      user: { id: createJobApplicationDto.userId.toString() },
      jobs: { id: createJobApplicationDto.jobId },
      
    });

    const jobApplicationSave =
      await this.jobApplicationRepository.save(jobApplication);

    if (!jobApplicationSave) {
      throw new NotFoundException(
        `Job with ID ${createJobApplicationDto.jobId} not found`,
      );
    }

    // Send notification to user
    this.notificationService.createNotification({
      type: 'JOBS',
      userId: createJobApplicationDto.userId.toString(),
      message: `You have applied to job ${createJobApplicationDto.jobId}`,
      is_read: false,
      senderUserId: userId
    })

    return jobApplicationSave;
  }

  async update(
    id: number,
    updateJobApplicationDto: UpdateJobApplicationDto,
  ): Promise<JobApplication> {
    const jobApplication = await this.jobApplicationRepository.preload({
      id,
      ...updateJobApplicationDto,
    });

    if (!jobApplication) {
      throw new NotFoundException(`JobApplication with ID ${id} not found`);
    }

    if (updateJobApplicationDto.userId) {
      const user = await this.userRepository.findOne({
        where: { id: updateJobApplicationDto.userId.toString() },
      });

      if (!user) {
        throw new NotFoundException(
          `User with ID ${updateJobApplicationDto.userId} not found`,
        );
      }

      jobApplication.user = user;
    }

    if (updateJobApplicationDto.jobId) {
      const job = await this.jobRepository.findOne({
        where: { id: updateJobApplicationDto.jobId },
      });

      if (!job) {
        throw new NotFoundException(
          `Job with ID ${updateJobApplicationDto.jobId} not found`,
        );
      }
    }

    return this.jobApplicationRepository.save(jobApplication);
  }

  async remove(id: number): Promise<void> {
    const result = await this.jobApplicationRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`JobApplication with ID ${id} not found`);
    }
  }
}
