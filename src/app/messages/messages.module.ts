import { Module } from '@nestjs/common';
import { MessageController } from './messages.controller';
import { MessageService } from './messages.service';
import { MessageProviders } from './messages';
import { DatabaseModule } from 'src/database/database.module';
import { RoomProviders } from '../rooms/rooms';
import { ChatGateway } from '../chat/chat.gateway';
import { NotificationService } from '../notification/notification.service';
import { NotificationProviders } from '../notification/notification';
import { ContractsProviders } from '../contracts/contracts';
import { ContractsService } from '../contracts/contracts.service';
import { NounusProviders } from '../nounus/nounus';
import { ParentProviders } from '../parent/parent';

@Module({
  imports: [DatabaseModule],
  controllers: [MessageController],
  providers: [MessageService, NotificationService, ...NotificationProviders, ContractsService, ...NounusProviders, ...ParentProviders, ...ContractsProviders, ...MessageProviders, ...RoomProviders]
})
export class MessagesModule {}
