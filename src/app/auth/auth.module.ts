import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth.strategy';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';
import { Roles } from '../role/models/role.model';
import { Parameter } from '../parameter/models/parameter.model';
import { ProfilParents } from '../parent/models/parent.model';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([User, Roles, Parameter, ProfilParents]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
      global: true
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy],
  exports: [AuthService, TypeOrmModule]
})
export class AuthModule {}
