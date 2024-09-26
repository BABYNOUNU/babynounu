import { Module } from '@nestjs/common';
import { UserModule } from './app/likidons/user/user.module';
import { PhotoService } from './app/likidons/photo/photo.service';
import { PhotoController } from './app/likidons/photo/photo.controller';
import { PhotoModule } from './app/likidons/photo/photo.module';
import { UserController } from './app/likidons/user/user.controller';
import { UserService } from './app/likidons/user/user.service';
import { AuthModule } from './app/consegna/auth/auth.module';
import { AgencyModule } from './app/consegna/agency/agency.module';

@Module({
  imports: [UserModule, PhotoModule, AuthModule, AgencyModule],
  controllers: [PhotoController],
  providers: [],
})
export class AppModule {}
