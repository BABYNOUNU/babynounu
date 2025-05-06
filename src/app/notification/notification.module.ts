import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { NotificationProviders } from './notification';
import { DatabaseModule } from 'src/database/database.module';
import { AbonnementService } from '../abonnement/abonnement.service';
import { AbonnementProviders } from '../abonnement/abonnement';
import { AbonnementModule } from '../abonnement/abonnement.module';
import { PaiementProviders } from '../paiement/paiement';
import { PaymentService } from '../paiement/paiement.service';
import { NounusService } from '../nounus/nounus.service';
import { NounusProviders } from '../nounus/nounus';
import { MediaService } from '../media/media.service';
import { MediaProviders } from '../media/media';
import { PreferenceProvider } from '../Preference/preference';
import { ParameterProviders } from '../parameter/parameter';
import { ParameterService } from '../parameter/parameter.service';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController],
  providers: [
    NotificationService,
    PaymentService,
    AbonnementService,
    NounusService,
       MediaService,
       ParameterService,
       ...ParameterProviders,
       ...MediaProviders,
       ...PreferenceProvider,
       ...NounusProviders,
    ...AbonnementProviders,
    ...PaiementProviders,
    ...NotificationProviders,
  ],
})
export class NotificationModule {}
