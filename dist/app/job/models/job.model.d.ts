import { User } from 'src/app/user/user.model';
export declare class Job {
    id: number;
    title: string;
    description: string;
    location: string;
    salary: number;
    user: User;
}
