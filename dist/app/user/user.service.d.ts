import { Repository } from 'typeorm';
import { User } from './user.model';
export declare class UserService {
    private userRepository;
    private userSockets;
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
    registerSocket(userId: any, socketId: string): void;
    removeSocket(userId: any): void;
    findSocket(userId: any): string | undefined;
    findAdminSockets(): string[];
    private isAdmin;
    findOne(id: string): Promise<User | undefined>;
    ReturnN(datas: any[], preferenceKey: any[], type_profil: any): Promise<any[]>;
}
