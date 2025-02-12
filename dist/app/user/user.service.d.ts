import { Repository } from 'typeorm';
import { User } from './user.model';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    user(slug: any): Promise<User | null>;
    users(): Promise<User[]>;
    createUser(data: {
        fullname: string;
        email: string;
    }): Promise<User>;
    updateUser(data: {
        fullname: string;
        email: string;
    }): Promise<User>;
    deleteUser(where: any): Promise<{
        message: string;
    }>;
    loggedUser(ID: any): Promise<User | null>;
    ReturnN(datas: any[], preferenceKey: any[]): Promise<any[]>;
}
