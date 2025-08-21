import { JobApplicationsService } from './job-application.service';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';
import { JobApplication } from './models/job-application.model';
export declare class JobApplicationController {
    private readonly jobApplicationService;
    constructor(jobApplicationService: JobApplicationsService);
    create(createJobApplicationDto: CreateJobApplicationDto, req: any): Promise<JobApplication>;
    findAll(): Promise<JobApplication[]>;
    findOne(id: string): Promise<JobApplication>;
    update(id: string, updateJobApplicationDto: UpdateJobApplicationDto): Promise<JobApplication>;
    remove(id: string): Promise<void>;
    getJobApplyByUser(userId: string): Promise<any[]>;
    getJobToApplyByUser(userId: string): Promise<any[]>;
}
