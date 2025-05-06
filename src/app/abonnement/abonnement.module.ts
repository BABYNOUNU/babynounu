import { PaiementProviders } from './../paiement/paiement';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbonnementController } from './abonnement.controller';
import { AbonnementService } from './abonnement.service';
import { DatabaseModule } from 'src/database/database.module';
import { AbonnementProviders } from './abonnement';
import { PaymentService } from '../paiement/paiement.service';
import { NotificationService } from '../notification/notification.service';
import { NotificationModule } from '../notification/notification.module';
import { NotificationProviders } from '../notification/notification';
import { NounusService } from '../nounus/nounus.service';
import { MediaService } from '../media/media.service';
import { ParameterService } from '../parameter/parameter.service';
import { ParameterProviders } from '../parameter/parameter';
import { MediaProviders } from '../media/media';
import { PreferenceProvider } from '../Preference/preference';
import { NounusProviders } from '../nounus/nounus';

@Module({
  imports: [DatabaseModule],
  controllers: [AbonnementController],
  providers: [
    AbonnementService,
    PaymentService,
    NotificationService,
    NounusService,
    MediaService,
    ParameterService,
    ...ParameterProviders,
    ...MediaProviders,
    ...PreferenceProvider,
    ...NounusProviders,
    ...NotificationProviders,
    ...PaiementProviders,
    ...AbonnementProviders,
  ],
})
export class AbonnementModule {}
