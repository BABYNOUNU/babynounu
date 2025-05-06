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
import { NounusService } from '../nounus/nounus.service';
import { MediaService } from '../media/media.service';
import { ParameterService } from '../parameter/parameter.service';
import { ParameterProviders } from '../parameter/parameter';
import { MediaProviders } from '../media/media';
import { PreferenceProvider } from '../Preference/preference';

@Module({
  imports: [DatabaseModule],
  controllers: [MessageController],
  providers: [
    MessageService,
    NotificationService,
    ...NotificationProviders,
    ContractsService,
    NounusService,
    MediaService,
    ParameterService,
    ...ParameterProviders,
    ...MediaProviders,
    ...PreferenceProvider,
    ...NounusProviders,
    ...NounusProviders,
    ...ParentProviders,
    ...ContractsProviders,
    ...MessageProviders,
    ...RoomProviders,
  ],
})
export class MessagesModule {}
