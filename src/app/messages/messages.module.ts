import { Module } from '@nestjs/common';
import { MessageController } from './messages.controller';
import { MessageService } from './messages.service';
import { MessageProviders } from './messages';
import { DatabaseModule } from 'src/database/database.module';
import { RoomProviders } from '../rooms/rooms';
import { ChatGateway } from '../chat/chat.gateway';

@Module({
  imports: [DatabaseModule],
  controllers: [MessageController],
  providers: [MessageService, ...MessageProviders, ...RoomProviders]
})
export class MessagesModule {}
