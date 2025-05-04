import { Module } from '@nestjs/common';
import { PaymentController } from './paiement.controller';
import { PaymentService } from './paiement.service';
import { PaiementProviders } from './paiement';
import { DatabaseModule } from 'src/database/database.module';
import { NotificationService } from '../notification/notification.service';
import { NotificationProviders } from '../notification/notification';
import { AbonnementService } from '../abonnement/abonnement.service';
import { AbonnementProviders } from '../abonnement/abonnement';

@Module({
  imports: [DatabaseModule],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    AbonnementService,
    NotificationService,
    ...AbonnementProviders,
    ...NotificationProviders,
    ...PaiementProviders
  ],
})
export class PaiementModule {}
