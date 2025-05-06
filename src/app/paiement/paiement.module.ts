import { Module } from '@nestjs/common';
import { PaymentController } from './paiement.controller';
import { PaymentService } from './paiement.service';
import { PaiementProviders } from './paiement';
import { DatabaseModule } from 'src/database/database.module';
import { NotificationService } from '../notification/notification.service';
import { NotificationProviders } from '../notification/notification';
import { AbonnementService } from '../abonnement/abonnement.service';
import { AbonnementProviders } from '../abonnement/abonnement';
import { NounusProviders } from '../nounus/nounus';
import { NounusService } from '../nounus/nounus.service';
import { PreferenceProvider } from '../Preference/preference';
import { MediaService } from '../media/media.service';
import { MediaProviders } from '../media/media';
import { ParameterService } from '../parameter/parameter.service';
import { ParameterProviders } from '../parameter/parameter';

@Module({
  imports: [DatabaseModule],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    AbonnementService,
    NotificationService,
    NounusService,
    MediaService,
    ParameterService,
    ...ParameterProviders,
    ...MediaProviders,
    ...PreferenceProvider,
    ...NounusProviders,
    ...AbonnementProviders,
    ...NotificationProviders,
    ...PaiementProviders
  ],
})
export class PaiementModule {}
