import { User } from 'src/app/user/user.model';
import { Notification } from 'src/app/notification/models/notification.model';
import { JobApplication } from 'src/app/job-application/models/job-application.model';
export declare class Job {
    id: number;
    title: string;
    description: string;
    budget_min: string;
    budget_max: string;
    service_frequency: string;
    notifications: Notification[];
    job_application: JobApplication;
    schedules_available: string;
    user: User;
}
