import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthProviders } from './auth.providers';
import { AuthService } from './auth.service';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth.strategy';
import { RoleProviders } from '../role/role';
import { UserService } from '../user/user.service';


@Module({
  imports: [DatabaseModule, JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '1d' },
    global: true
  })],
  controllers: [AuthController],
  providers: [AuthService, UserService, ...AuthProviders, ...RoleProviders, JwtStrategy],
})
export class AuthModule {}
