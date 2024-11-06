import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { RoleBody } from './types/role.type';

@ApiTags('Roles')
@Controller('role')
export class RoleController {

    constructor(private readonly roleService: RoleService){
        
    }

     // Get Roles
  @Get('')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  GetRoles() {
    return this.roleService.roles();
  }

  // Get Single Role
  @Get('/:id')
  GetRole(@Param('id') id: string) {
    return this.roleService.role({
      id: Number(id),
    });
  }

  // Create New Role
  @Post('/create')
  CreateRole(@Body() roleBody: RoleBody) {
    return this.roleService.createRole(roleBody);
  }

  // Create New Role
  @Patch('/update/:id')
  UpdateRole(@Body() roleBody: RoleBody) {
    return this.roleService.updateRole(roleBody);
  }

  // Delete Role
  @Delete('/delete/:id')
  DeleteRole(@Param('id') id: string) {
    return this.roleService.deleteRole(id);
  }

}
