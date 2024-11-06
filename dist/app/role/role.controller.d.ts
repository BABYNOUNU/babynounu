import { RoleService } from './role.service';
import { RoleBody } from './types/role.type';
export declare class RoleController {
    private readonly roleService;
    constructor(roleService: RoleService);
    GetRoles(): Promise<import("./models/role.model").Roles[]>;
    GetRole(id: string): Promise<import("./models/role.model").Roles>;
    CreateRole(roleBody: RoleBody): Promise<import("./models/role.model").Roles>;
    UpdateRole(roleBody: RoleBody): Promise<import("./models/role.model").Roles>;
    DeleteRole(id: string): Promise<{
        message: string;
    }>;
}
