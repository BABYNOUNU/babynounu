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
import { AuthService } from '../auth/auth.service';
import { AbonnementService } from '../abonnement/abonnement.service';
import { RoleProviders } from '../role/role';
import { ParameterProviders } from '../parameter/parameter';
import { AuthProviders } from '../auth/auth.providers';
import { AbonnementProviders } from '../abonnement/abonnement';
import { PaiementProviders } from '../paiement/paiement';
import { PaymentService } from '../paiement/paiement.service';
import { NotificationService } from '../notification/notification.service';
import { NotificationProviders } from '../notification/notification';
import { ContractsService } from '../contracts/contracts.service';
import { ContractsProviders } from '../contracts/contracts';
import { NounusProviders } from '../nounus/nounus';
import { NounusService } from '../nounus/nounus.service';
import { MediaService } from '../media/media.service';
import { ParameterService } from '../parameter/parameter.service';
import { MediaProviders } from '../media/media';
import { PreferenceProvider } from '../Preference/preference';

@Module({
  imports: [DatabaseModule],
  controllers: [ChatController],
  providers: [
    ChatService,
    // ChatGateway,
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
    ...ParameterProviders,
    ...MediaProviders,
    ...PreferenceProvider,
    ...NounusProviders,
    ...ContractsProviders,
    ...NounusProviders,
    ...PaiementProviders,
    ...NotificationProviders,
    ...AbonnementProviders,
    ...PaiementProviders,
    ...AuthProviders,
    ...ParameterProviders,
    ...RoleProviders,
    ...RoomProviders,
    ...MessageProviders,
    ...UserProviders,
  ],
})
export class ChatModule {}
