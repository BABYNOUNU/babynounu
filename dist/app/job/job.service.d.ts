import { Repository } from 'typeorm';
import { Job } from './models/job.model';
import { CreateJobDto } from './dtos/create-job.dto';
import { UpdateJobDto } from './dtos/update-job.dto';
import { Preference } from '../Preference/models/preference.model';
import { MediaService } from '../media/media.service';
export declare class JobsService {
    private jobRepository;
    private readonly preferenceRepository;
    private readonly mediaService;
    constructor(jobRepository: Repository<Job>, preferenceRepository: Repository<Preference>, mediaService: MediaService);
    private RelationShip;
    private preferenceKeys;
    createJob(createJobDto: CreateJobDto, files: any): Promise<Job>;
    findAllJobs(): Promise<Job[]>;
    findJobById(id: number): Promise<Job>;
    findAllJobByUser(userId: string): Promise<Job[]>;
    updateJob(id: string, updateJobDto: UpdateJobDto, files: any): Promise<any>;
    deleteJob(id: number): Promise<import("typeorm").UpdateResult>;
    getJobApplyByUserId(userId: string): Promise<Job[]>;
    ReturnN(datas: any[], preferenceKey: any[]): Promise<Job[]>;
}
