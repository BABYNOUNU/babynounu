import { Repository } from 'typeorm';
import { Job } from './models/job.model';
import { CreateJobDto } from './dtos/create-job.dto';
import { UpdateJobDto } from './dtos/update-job.dto';
import { SettingServiceFrequency } from '../setting/models/setting_service_frequency.model';
import { SettingGuardSchedules } from '../setting/models/setting_guard_schedule.model';
export declare class JobsService {
    private jobRepository;
    private readonly settingDesiredTimesRepository;
    private readonly settingServiceFrequencyRepository;
    constructor(jobRepository: Repository<Job>, settingDesiredTimesRepository: Repository<SettingGuardSchedules>, settingServiceFrequencyRepository: Repository<SettingServiceFrequency>);
    createJob(createJobDto: CreateJobDto): Promise<Job>;
    findAllJobs(): Promise<Job[]>;
    findJobById(id: number): Promise<Job>;
    findAllJobByUser(userId: string): Promise<Job[]>;
    updateJob(id: number, updateJobDto: UpdateJobDto): Promise<Job>;
    deleteJob(id: number): Promise<Job>;
}
