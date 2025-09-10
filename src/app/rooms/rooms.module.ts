import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { UserService } from '../user/user.service';
import { MessageService } from '../messages/messages.service';
import { NotificationService } from '../notification/notification.service';
import { ContractsService } from '../contracts/contracts.service';
import { NounusService } from '../nounus/nounus.service';
import { ParameterService } from '../parameter/parameter.service';
import { MediaService } from '../media/media.service';
import { Rooms } from './models/room.model';
import { RoomMessageCount } from './models/unreadCount.model';
import { User } from '../user/user.model';
import { Message } from '../messages/models/message.model';
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
      Rooms,
      RoomMessageCount,
      User,
      Message,
      Notification,
      Contracts,
      ProfilNounus,
      ProfilParents,
      Parameter,
      Medias,
      Preference
    ])
  ],
  controllers: [RoomsController],
  providers: [
    RoomsService,
    UserService,
    MessageService,
    NotificationService,
    ContractsService,
    NounusService,
    MediaService,
    ParameterService
  ],
  exports: [RoomsService, TypeOrmModule]
})
export class RoomsModule {}
