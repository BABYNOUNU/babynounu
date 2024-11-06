import { Inject, Injectable } from '@nestjs/common';
import { Roles } from './models/role.model';
import { Repository } from 'typeorm';
import { RoleBody } from './types/role.type';

@Injectable()
export class RoleService {
  constructor(
    @Inject('ROLE_REPOSITORY')
    private readonly roleRepository: Repository<Roles>,
  ) {}

  async role(roleWhereUniqueInput: any): Promise<Roles | null> {
    return this.roleRepository.findOne({
      where: roleWhereUniqueInput,
    });
  }

  async roles(): Promise<Roles[]> {
    return this.roleRepository.find();
  }

  async createRole(data: RoleBody): Promise<Roles> {
    const newRoles = this.roleRepository.create({
      slug: data.slug,
      name: data.name,
    });

    return await this.roleRepository.save(newRoles);
  }

  async updateRole(data: RoleBody): Promise<Roles> {
    const newRoles = this.roleRepository.create({
      name: data.name,
    });

    return await this.roleRepository.save(newRoles);
  }

  async deleteRole(where: any) {
    this.roleRepository.delete({ id: where });
    return { message: 'Roles deleted' };
  }
}
