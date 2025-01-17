import { Repository } from 'typeorm';
import { Job } from './models/job.model';
import { CreateJobDto } from './dtos/create-job.dto';
import { UpdateJobDto } from './dtos/update-job.dto';
export declare class JobsService {
    private jobRepository;
    constructor(jobRepository: Repository<Job>);
    createJob(createJobDto: CreateJobDto): Promise<Job>;
    findAllJobs(): Promise<Job[]>;
    findJobById(id: number): Promise<Job>;
    updateJob(id: number, updateJobDto: UpdateJobDto): Promise<Job>;
    deleteJob(id: number): Promise<Job>;
}
