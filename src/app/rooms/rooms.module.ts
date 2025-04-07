import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { RoomProviders } from './rooms';
import { DatabaseModule } from 'src/database/database.module';
import { ChatGateway } from '../chat/chat.gateway';
import { UserService } from '../user/user.service';
import { UserProviders } from '../user/user.providers';


@Module({
  imports: [DatabaseModule],
  controllers: [RoomsController],
  providers: [RoomsService, UserService, ...RoomProviders, ...UserProviders]
})
export class RoomsModule {}
