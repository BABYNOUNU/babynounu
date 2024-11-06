import { Roles } from './models/role.model';
import { Repository } from 'typeorm';
import { RoleBody } from './types/role.type';
export declare class RoleService {
    private readonly roleRepository;
    constructor(roleRepository: Repository<Roles>);
    role(roleWhereUniqueInput: any): Promise<Roles | null>;
    roles(): Promise<Roles[]>;
    createRole(data: RoleBody): Promise<Roles>;
    updateRole(data: RoleBody): Promise<Roles>;
    deleteRole(where: any): Promise<{
        message: string;
    }>;
}
