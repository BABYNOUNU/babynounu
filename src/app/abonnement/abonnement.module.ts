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
import { NotificationGateway } from '../notification/notification.gateway';

@Module({
  imports: [DatabaseModule],
  controllers: [AbonnementController],
  providers: [
    AbonnementService,
    PaymentService,
    NotificationGateway,
    NotificationService,
    ...NotificationProviders,
    ...PaiementProviders,
    ...AbonnementProviders,
  ],
})
export class AbonnementModule {}
