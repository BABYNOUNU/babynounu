import { UserService } from './user.service';
type UserBody = {
    fullname: string;
    email: string;
};
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    GetUsers(): Promise<import("./user.model").User[]>;
    LoggedUser(): {
        message: string;
        status: boolean;
    };
    GetUser(slug: string): Promise<import("./user.model").User>;
    CreateUser(userBody: UserBody): Promise<import("./user.model").User>;
    UpdateUser(userBody: UserBody): Promise<import("./user.model").User>;
    DeleteUser(id: string): Promise<{
        message: string;
    }>;
}
export {};
