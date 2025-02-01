import { User } from 'src/app/user/user.model';
import { Job } from 'src/app/job/models/job.model';
export declare class Notification {
    id: number;
    type: string;
    job: Job;
    message: string;
    isRead: boolean;
    user: User;
    sender: User;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
