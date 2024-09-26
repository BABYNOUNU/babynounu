import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service'
import { DatabaseModule } from 'src/database/database.module';
import { UserProviders } from './user.providers'

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...UserProviders]
})
export class UserModule {}
