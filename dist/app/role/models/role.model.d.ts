import { User } from 'src/app/user/user.model';
export declare class Roles {
    id: number;
    slug: string;
    name: string | number;
    description: string;
    user: User;
}
