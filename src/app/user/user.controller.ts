import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

type UserBody = {
  fullname: string;
  email: string;
};

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Get Users
  @Get('')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  GetUsers() {
    return this.userService.users();
  }

  // Logged User Connect
  @UseGuards(JwtAuthGuard)
  @Get('/logged/:id')
  LoggedUser(@Param('id') ID: string) {
    return this.userService.loggedUser(ID);
  }

  // Get Single User
  @Get('/:slug')
  GetUser(@Param('slug') slug: string) {
    return this.userService.user(slug);
  }

  // Create New User
  @Post('/create')
  CreateUser(@Body() userBody: UserBody) {
    return this.userService.createUser(userBody);
  }

  // Create New User
  @Patch('/update/:id')
  UpdateUser(@Body() userBody: UserBody) {
    return this.userService.updateUser(userBody);
  }

  // Delete User
  @Delete('/delete/:id')
  DeleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
