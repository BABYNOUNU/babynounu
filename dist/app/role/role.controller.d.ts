import { RoleService } from './role.service';
import { RoleDto } from './dto/role.dto';
export declare class RoleController {
    private readonly roleService;
    constructor(roleService: RoleService);
    GetRoles(): Promise<import("./models/role.model").Roles[]>;
    GetRole(slug: string): Promise<import("./models/role.model").Roles>;
    CreateRole(roleBody: RoleDto): Promise<import("./models/role.model").Roles>;
    UpdateRole(roleBody: RoleDto, slug: string): Promise<import("./models/role.model").Roles>;
    DeleteRole(slug: string): Promise<{
        setting: {
            slug: any;
            message: string;
        };
    }>;
}
