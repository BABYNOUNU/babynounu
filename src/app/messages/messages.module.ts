import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesController } from './messages.controller';
import { MessageService } from './messages.service';
import { ChatGateway } from '../chat/chat.gateway';
import { NotificationService } from '../notification/notification.service';
import { ContractsService } from '../contracts/contracts.service';
import { NounusService } from '../nounus/nounus.service';
import { MediaService } from '../media/media.service';
import { ParameterService } from '../parameter/parameter.service';

// Entity imports
import { Message } from './models/message.model';
import { Rooms } from '../rooms/models/room.model';
import { Notification } from '../notification/models/notification.model';
import { Contracts } from '../contracts/models/contracts.model';
import { ProfilNounus } from '../nounus/models/nounu.model';
import { ProfilParents } from '../parent/models/parent.model';
import { Parameter } from '../parameter/models/parameter.model';
import { Medias } from '../media/models/media.model';
import { Preference } from '../Preference/models/preference.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Message,
      Rooms,
      Notification,
      Contracts,
      ProfilNounus,
      ProfilParents,
      Parameter,
      Medias,
      Preference,
    ]),
  ],
  controllers: [MessagesController],
  providers: [
    MessageService,
    NotificationService,
    ContractsService,
    NounusService,
    MediaService,
    ParameterService,
  ],
  exports: [MessageService, TypeOrmModule],
})
export class MessagesModule {}
