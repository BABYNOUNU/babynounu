import { Injectable } from '@nestjs/common';
import {
  AUTH_SIGN_IN_AGENCY_TYPE,
  AUTH_SIGN_IN_TYPE,
  AUTH_SIGN_UP_AGENCY_TYPE,
  AUTH_SIGN_UP_TYPE,
} from 'src/types/authTypes';

@Injectable()
export class AuthService {
  // SIGN UP NEW USER
  public signUp(DtoSignUp: AUTH_SIGN_UP_TYPE) {
    return 
  }

  //   SIGN IN USER
  public signIn(DtoSignIn: AUTH_SIGN_IN_TYPE) {}

}
