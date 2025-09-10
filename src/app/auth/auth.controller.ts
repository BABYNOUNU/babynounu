import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import type {
  AUTH_SIGN_IN_AGENCY_TYPE,
  AUTH_SIGN_IN_TYPE,
  AUTH_SIGN_UP_TYPE,
} from 'src/types/authTypes';
import { SginInAuthDto } from './dto/signIn.dto';
import { SginUpAuthDto } from './dto/signUp.dto';
import { JwtAuthGuard } from './auth.guard';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentification')
@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  // USER CONNECT
  @Post('/sign-up')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiBody({
    type: SginUpAuthDto,
    description: 'Json structure for register object',
  })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  SignUp(@Body() signUpBody: SginUpAuthDto) {
    return this.AuthService.signUp({ signUpBody });
  }

  // @UseGuards(JwtAuthGuard)
  @Post('/sign-in')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiBody({
    type: SginInAuthDto,
    description: 'Json structure for login object',
  })
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  SignIn(@Body() signInBody: SginInAuthDto) {
    return this.AuthService.signIn({ signInBody });
  }
}
