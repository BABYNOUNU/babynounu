import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { NotificationProviders } from './notification';
import { DatabaseModule } from 'src/database/database.module';
import { AbonnementService } from '../abonnement/abonnement.service';
import { AbonnementProviders } from '../abonnement/abonnement';
import { NotificationGateway } from './notification.gateway';
import { AbonnementModule } from '../abonnement/abonnement.module';
import { PaiementProviders } from '../paiement/paiement';
import { PaymentService } from '../paiement/paiement.service';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController],
  providers: [
    NotificationService,
    PaymentService,
    NotificationGateway,
    AbonnementService,
    ...AbonnementProviders,
    ...PaiementProviders,
    ...NotificationProviders,
  ],
})
export class NotificationModule {}
