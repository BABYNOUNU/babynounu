import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './models/job.model';
import { CreateJobDto } from './dtos/create-job.dto';
import { UpdateJobDto } from './dtos/update-job.dto';
import { SettingDesiredTime } from '../setting/models/setting_desired_time.model';
import { ParentSettingDeriredTimes } from '../parent/models/parent_setting_desired_time.model';
import { SettingServiceFrequency } from '../setting/models/setting_service_frequency.model';
import { ParentSettingServiceFrequency } from '../parent/models/parent_setting_service_frequency.model';
import { SettingGuardSchedules } from '../setting/models/setting_guard_schedule.model';

@Injectable()
export class JobsService {
  constructor(
    @Inject('JOB_REPOSITORY')
    private jobRepository: Repository<Job>,
    @Inject('SETTING_DESIRED_TIME_REPOSITORY')
    private readonly settingDesiredTimesRepository: Repository<SettingGuardSchedules>,

    @Inject('SETTING_SERVICE_FREQUENCY_REPOSITORY')
    private readonly settingServiceFrequencyRepository: Repository<SettingServiceFrequency>,
  ) {}

  async createJob(createJobDto: CreateJobDto) {
    const job = this.jobRepository.create({
      title: createJobDto.title,
      description: createJobDto.description,
      budget_min: createJobDto.budget_min,
      budget_max: createJobDto.budget_max,
      schedules_available: createJobDto.schedules_available,
      service_frequency: createJobDto.service_frequency,
      user: { id: createJobDto.user },
    });
    const saveJob = await this.jobRepository.save(job);

    if (!saveJob) {
      throw new BadRequestException({ message: 'Parent not created' });
    }

    const GetJob = await this.jobRepository.findOne({
      where: { id: saveJob.id },
      relations: ['user', 'user.parent'],
    });

    return GetJob;
  }

  async findAllJobs() {
    return this.jobRepository.find({
      relations: [
        'user',
        'user.parent',
        'user.parent.settingLanguages.language',
        'user.parent.settingAgeOfChildrens.AgeOfChildrens',
        'user.parent.settingDesiredTimes.time',
        'user.parent.settingAreaWorks.area',
        'user.parent.settingSpecificSkills.skill',
        'user.parent.settingSpecificNeeds.SpecificNeeds',
        'user.parent.settingGuardSchedules.GuardSchedules',
        'user.parent.settingHousekeepers.Housekeepers'
      ],
    });
  }

  async findJobById(id: number) {
    const job = await this.jobRepository.findOne({ where: { id }, relations: [
      'user',
        'user.parent',
        'user.parent.settingLanguages.language',
        'user.parent.settingAgeOfChildrens.AgeOfChildrens',
        'user.parent.settingDesiredTimes.time',
        'user.parent.settingAreaWorks.area',
        'user.parent.settingSpecificSkills.skill',
        'user.parent.settingSpecificNeeds.SpecificNeeds',
        'user.parent.settingGuardSchedules.GuardSchedules',
        'user.parent.settingHousekeepers.Housekeepers',
        'job_application'
    ] });
    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    return job;
  }


  async findAllJobByUser(userId: string) {
    const jobUser = await this.jobRepository.find({ where: { user: { id: userId } }, relations: [
      'user',
        'user.parent',
        'user.parent.settingLanguages.language',
        'user.parent.settingAgeOfChildrens.AgeOfChildrens',
        'user.parent.settingDesiredTimes.time',
        'user.parent.settingAreaWorks.area',
        'user.parent.settingSpecificSkills.skill',
        'user.parent.settingSpecificNeeds.SpecificNeeds',
        'user.parent.settingGuardSchedules.GuardSchedules',
        'user.parent.settingHousekeepers.Housekeepers'
    ] });
    if (!jobUser) {
      throw new NotFoundException(`Job with ID ${jobUser} not found`);
    }
    return jobUser;
  }

  

  async updateJob(id: number, updateJobDto: UpdateJobDto) {
    const job = await this.findJobById(id); 
    Object.assign(job, updateJobDto);
    return this.jobRepository.save(job);
  }

  async deleteJob(id: number) {
    const job = await this.findJobById(id);
    return this.jobRepository.remove(job);
  }
}
