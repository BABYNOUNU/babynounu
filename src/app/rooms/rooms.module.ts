import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { RoomProviders } from './rooms';
import { DatabaseModule } from 'src/database/database.module';
import { UserService } from '../user/user.service';
import { UserProviders } from '../user/user.providers';
import { MessageService } from '../messages/messages.service';
import { MessageProviders } from '../messages/messages';
import { NotificationService } from '../notification/notification.service';
import { NotificationProviders } from '../notification/notification';
import { ContractsProviders } from '../contracts/contracts';
import { ContractsService } from '../contracts/contracts.service';
import { NounusProviders } from '../nounus/nounus';
import { ParentProviders } from '../parent/parent';
import { NounusService } from '../nounus/nounus.service';
import { ParameterService } from '../parameter/parameter.service';
import { MediaService } from '../media/media.service';
import { ParameterProviders } from '../parameter/parameter';
import { MediaProviders } from '../media/media';
import { PreferenceProvider } from '../Preference/preference';

@Module({
  imports: [DatabaseModule],
  controllers: [RoomsController],
  providers: [
    RoomsService,
    UserService,
    MessageService,
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
    ...ParentProviders,
    ...NotificationProviders,
    ...MessageProviders,
    ...RoomProviders,
    ...UserProviders,
  ],
})
export class RoomsModule {}
