import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Roles } from './models/role.model';
import { Repository } from 'typeorm';
import { RoleBody } from './types/role.type';
import { SlugUtils } from 'src/utils/slug.utils';
import { RoleDto } from './dto/role.dto';

@Injectable()
export class RoleService {
  constructor(
    @Inject('ROLE_REPOSITORY')
    private readonly roleRepository: Repository<Roles>,
  ) {
  }

  async role(roleWhereUniqueInput: any): Promise<Roles | null> {
    return this.roleRepository.findOne({
      where: roleWhereUniqueInput,
    });
  }

  async roles(): Promise<Roles[]> {
    return this.roleRepository.find();
  }

  async createRole(createRoleBody: RoleDto): Promise<Roles> {
    //Verify if role name exist
    const IsNameExist = await this.roleRepository.findOne({
      where: { name: createRoleBody.name },
    });

    if (IsNameExist) {
      throw new BadRequestException({ message: 'Role name already exist' });
    }

    createRoleBody.slug = await new SlugUtils().all(
      createRoleBody.name,
      this.roleRepository,
    );

    // CREATE NEW ROLE
    const newRole = this.roleRepository.create({
      slug: createRoleBody.slug,
      name: createRoleBody.name,
      description: createRoleBody.description,
    });
    const roleSave = await this.roleRepository.save(newRole);
    if (!roleSave) {
      throw new BadRequestException({ message: 'Setting not created' });
    }

    // RETURN DATA USER CREATE
    return {
      ...roleSave,
    };
  }

  async updateRole(updateRoleBody: RoleDto, {slug}): Promise<Roles> {
    //Verify if setting slug exist

   await new SlugUtils().all(
      slug,
      this.roleRepository,
    );

    // UPDATE SETTING
    const updateRole = await this.roleRepository.update(
      { slug },
      {
        name: updateRoleBody.name,
        description: updateRoleBody.description,
      },
    );

    if (!updateRole.affected) {
      throw new BadRequestException({ message: 'Setting not updated' });
    }

    // RETURN DATA SETTING UPDATE
    return {
        ...(await this.roleRepository.findOne({ where: { slug: slug } })),
    };
  }

  // Delete Setting
  async deleteRole({slug}) {
    //Verify if setting slug exist
     await new SlugUtils().all(
      slug,
      this.roleRepository,
    );

    // DELETE SETTING
    const deleteRole = await this.roleRepository.delete({ slug });

    if (!deleteRole.affected) {
      throw new BadRequestException({ message: 'Role not deleted' });
    }

    // RETURN DATA SETTING UPDATE
    return {
      setting: {
        slug,
        message: 'Role deleted',
      },
    };
  
  }
}
