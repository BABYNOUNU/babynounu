import { User } from 'src/app/user/user.model';
import { Job } from 'src/app/job/models/job.model';
export declare class Notification {
    id: number;
    type: string;
    job: Job;
    message: string;
    tolinkId: string;
    isRead: boolean;
    user: User;
    sender: User;
    isActions: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
