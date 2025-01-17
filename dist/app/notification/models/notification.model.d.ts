import { User } from 'src/app/user/user.model';
export declare class Notification {
    id: number;
    type: string;
    message: string;
    isRead: boolean;
    user: User;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
