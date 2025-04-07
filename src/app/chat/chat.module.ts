import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { RoomsService } from '../rooms/rooms.service';
import { UserService } from '../user/user.service';
import { MessageService } from '../messages/messages.service';
import { DatabaseModule } from 'src/database/database.module';
import { RoomProviders } from '../rooms/rooms';
import { MessageProviders } from '../messages/messages';
import { UserProviders } from '../user/user.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ChatController],
  providers: [
    ChatService,
    ChatGateway,
    RoomsService,
    MessageService,
    UserService,
    ...RoomProviders,
    ...MessageProviders,
    ...UserProviders,
  ],
})
export class ChatModule {}
