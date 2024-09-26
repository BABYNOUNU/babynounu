import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from '../user/user.service'
import { AuthService } from './auth.service';
import { AUTH_SIGN_IN_AGENCY_TYPE, AUTH_SIGN_IN_TYPE, AUTH_SIGN_UP_TYPE } from 'src/types/authTypes';

@Controller('auth')
export class AuthController {
    
  constructor(
    private readonly AuthService: AuthService,
  ) {}

//   USER CONNECT

  @Post('/sign-up')
  SignUp(@Body() signUpBody: AUTH_SIGN_UP_TYPE) {
    return this.AuthService.signUp(signUpBody);
  }

  @Post('/sign-in')
  SignIn(@Body() signInBody: AUTH_SIGN_IN_TYPE) {
    return this.AuthService.signIn(signInBody);
  }

}
