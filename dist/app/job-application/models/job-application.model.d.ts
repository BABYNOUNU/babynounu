import { User } from 'src/app/user/user.model';
import { Job } from 'src/app/job/models/job.model';
export declare class JobApplication {
    id: number;
    user: User;
    jobs: Job;
    limit: number;
    is_apply: boolean;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
