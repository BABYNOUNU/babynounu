import { NotificationGateway } from './../notification/notification.gateway';
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

@Module({
  imports: [DatabaseModule],
  controllers: [AbonnementController],
  providers: [AbonnementService, PaymentService, NotificationService, ...AbonnementProviders, ...NotificationProviders],
})
export class AbonnementModule {}