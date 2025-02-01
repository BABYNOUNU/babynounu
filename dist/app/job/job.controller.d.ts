import { JobsService } from './job.service';
import { CreateJobDto } from './dtos/create-job.dto';
import { UpdateJobDto } from './dtos/update-job.dto';
export declare class JobsController {
    private readonly jobsService;
    constructor(jobsService: JobsService);
    createJob(createJobDto: CreateJobDto): Promise<import("./models/job.model").Job>;
    findAllJobs(): Promise<import("./models/job.model").Job[]>;
    findJobById(id: number): Promise<import("./models/job.model").Job>;
    findAllJobByUser(userId: any): Promise<import("./models/job.model").Job[]>;
    updateJob(id: number, updateJobDto: UpdateJobDto): Promise<import("./models/job.model").Job>;
    deleteJob(id: number): Promise<import("./models/job.model").Job>;
}
