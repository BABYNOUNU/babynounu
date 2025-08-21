import { Job } from 'src/app/job/models/job.model';
import { Parameter } from 'src/app/parameter/models/parameter.model';
import { User } from 'src/app/user/user.model';
export declare class Medias {
    id: string;
    originalName: string;
    filename: string;
    path: string;
    originalUrl: string;
    user: User;
    job: Job;
    type_media: Parameter;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
