import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { RoomsService } from '../rooms/rooms.service';
import { UserService } from '../user/user.service';
import { MessageService } from '../messages/messages.service';
import { AuthService } from '../auth/auth.service';
import { AbonnementService } from '../abonnement/abonnement.service';
import { PaymentService } from '../paiement/paiement.service';
import { NotificationService } from '../notification/notification.service';
import { ContractsService } from '../contracts/contracts.service';
import { NounusService } from '../nounus/nounus.service';
import { MediaService } from '../media/media.service';
import { ParameterService } from '../parameter/parameter.service';

// Entity imports
import { Rooms } from '../rooms/models/room.model';
import { RoomMessageCount } from '../rooms/models/unreadCount.model';
import { Message } from '../messages/models/message.model';
import { User } from '../user/user.model';
import { Roles } from '../role/models/role.model';
import { Abonnements } from '../abonnement/models/abonnement.model';
import { Paiements } from '../paiement/models/paiement.model';
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
      Message,
      User,
      Roles,
      Abonnements,
      Paiements,
      Notification,
      Contracts,
      ProfilNounus,
      ProfilParents,
      Parameter,
      Medias,
      Preference,
    ]),
  ],
  controllers: [ChatController],
  providers: [
    ChatService,
    ChatGateway,
    RoomsService,
    MessageService,
    UserService,
    AuthService,
    AbonnementService,
    PaymentService,
    NotificationService,
    ContractsService,
    NounusService,
    MediaService,
    ParameterService,
  ],
  exports: [ChatService, ChatGateway, TypeOrmModule],
})
export class ChatModule {}
