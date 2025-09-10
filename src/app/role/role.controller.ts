import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { RoleBody } from './types/role.type';
import { RoleDto } from './dto/role.dto';

@ApiTags('Roles')
@Controller('roles')
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
  @Get('/:slug')
  GetRole(@Param('slug') slug: string) {
    return this.roleService.role({
      slug: Number(slug),
    });
  }

  // Create New Role
  @Post('/create')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiBody({
    type: RoleDto,
    description: 'Json structure for register object',
  })
  @UsePipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true
  }))
  CreateRole(@Body() roleBody: RoleDto) {
    return this.roleService.createRole(roleBody);
  }

  // Create New Role
  @Patch('/update/:slug')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiBody({
    type: RoleDto,
    description: 'Json structure for register object',
  })
  @UsePipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true
  }))
  UpdateRole(@Body() roleBody: RoleDto, @Param('slug') slug: string,) {
    return this.roleService.updateRole(roleBody, {slug});
  }

  // Delete Role
  @Delete('/delete/:slug')
  DeleteRole(@Param('slug') slug: string) {
    return this.roleService.deleteRole({slug});
  }

}
