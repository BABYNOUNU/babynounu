import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import type { AUTH_SIGN_IN_TYPE, AUTH_SIGN_UP_TYPE } from 'src/types/authTypes';
import { Repository } from 'typeorm';
import { User } from '../user/user.model';
import { SginInAuthDto } from './dto/signIn.dto';
import { SginUpAuthDto } from './dto/signUp.dto';
import { SlugUtils } from 'src/utils/slug.utils';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Roles } from '../role/models/role.model';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
    @Inject('ROLE_REPOSITORY')
    private readonly roleRepository: Repository<Roles>,
    private readonly jwtService: JwtService,
  ) {}

  // SIGN UP NEW USER
  async signUp({ signUpBody }: { signUpBody: SginUpAuthDto }) {
    // SET SLUG
    signUpBody.slug = await new SlugUtils().slug(
      signUpBody.fullname,
      this.userRepository,
    );

    // CHECK IF USER ALREADY EXISTS
    const user = await this.userRepository.findOne({
      where: { email: signUpBody.email },
    });
    if (user) {
      throw new BadRequestException('User already exists');
    }

    // Checked if role exist
    const isRole = await this.roleRepository.findOne({ where: { id: signUpBody.role?.toLocaleString() } })
    if (!isRole) {
      throw new BadRequestException('The role enter not exists');
    }

    // PASSWORD HASH
    signUpBody.password = await bcrypt.hash(signUpBody.password, 10);

    // CREATE NEW USER
    const newUser = this.userRepository.create({
      slug: signUpBody.slug,
      email: signUpBody.email,
      password: signUpBody.password,
      role: isRole,
    });
    const userSave = await this.userRepository.save(newUser);
    if (!userSave) {
      throw new BadRequestException({ message: 'User not created' });
    }

    // RETURN DATA USER CREATE
    return {
      user: {
        ...userSave,
        access_token: (await this.authentificate(userSave)).access_token,
      },
    };
  }

  //   SIGN IN USER
  async signIn({ signInBody }: { signInBody: SginInAuthDto }) {
    // CHECK IF USER ALREADY EXISTS
    const user = await this.userRepository.findOne({
      where: { email: signInBody.email },
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    // CHECK IF PASSWORD IS CORRECT
    const isPasswordCorrect = await bcrypt.compare(
      signInBody.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw new BadRequestException('Password is incorrect');
    }

    // RETURN DATA USER CREATE
    return {
      user: {
        ...user,
        access_token: (await this.authentificate(user)).access_token,
      },
    };
  }

  // USER AUTHENTICATION
  async authentificate(user: User) {
    const payload = { email: user.email, id: user.id };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }

  // Verification is suser exist
  async isUserAuthentificateExist(email) {
    const isExist = await this.userRepository.findOne({ where: { email } });
    return isExist;
  }
}
