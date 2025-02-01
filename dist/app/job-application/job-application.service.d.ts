import { Repository } from 'typeorm';
import { JobApplication } from './models/job-application.model';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';
import { User } from '../user/user.model';
import { Job } from '../Job/models/Job.model';
import { NotificationService } from '../notification/notification.service';
export declare class JobApplicationsService {
    private readonly jobApplicationRepository;
    private readonly userRepository;
    private readonly jobRepository;
    private readonly notificationService;
    constructor(jobApplicationRepository: Repository<JobApplication>, userRepository: Repository<User>, jobRepository: Repository<Job>, notificationService: NotificationService);
    findAll(): Promise<JobApplication[]>;
    findOne(id: number): Promise<JobApplication>;
    create(createJobApplicationDto: CreateJobApplicationDto, userId: any): Promise<JobApplication>;
    update(id: number, updateJobApplicationDto: UpdateJobApplicationDto): Promise<JobApplication>;
    remove(id: number): Promise<void>;
}
