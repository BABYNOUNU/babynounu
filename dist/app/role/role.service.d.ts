import { Roles } from './models/role.model';
import { Repository } from 'typeorm';
import { RoleDto } from './dto/role.dto';
export declare class RoleService {
    private readonly roleRepository;
    constructor(roleRepository: Repository<Roles>);
    role(roleWhereUniqueInput: any): Promise<Roles | null>;
    roles(): Promise<Roles[]>;
    createRole(createRoleBody: RoleDto): Promise<Roles>;
    updateRole(updateRoleBody: RoleDto, { slug }: {
        slug: any;
    }): Promise<Roles>;
    deleteRole({ slug }: {
        slug: any;
    }): Promise<{
        setting: {
            slug: any;
            message: string;
        };
    }>;
}
