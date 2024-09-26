import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service

type UserBody = {
  name: string,
  email: string,
}

@Controller('users')
export class UserController {
  constructor(
    private readonly UserService: UserService,
  ) {}

  @Get('')
  GetUsers() {
    return this.UserService.users();
  }

  @Get('/:id')
  GetUser(@Param('id') id: string) {
    return this.UserService.user({
      id: Number(id)});
  }

  @Post('/create')
  CreateUser(@Body() userBody: UserBody) {
    return this.UserService.createUser(userBody)
  }
}
