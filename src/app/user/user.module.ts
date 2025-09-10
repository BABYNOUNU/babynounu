import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service'
import { DatabaseModule } from 'src/database/database.module';
import { User } from './user.model';
import { ChatGateway } from '../chat/chat.gateway';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, TypeOrmModule]
})
export class UserModule {}
