import { User } from 'src/app/user/user.model';
import { Parameter } from 'src/app/parameter/models/parameter.model';
export declare class Profile {
    id: number;
    firstName: string;
    lastName: string;
    bio: string;
    level: number;
    user: User;
    type: Parameter;
}
