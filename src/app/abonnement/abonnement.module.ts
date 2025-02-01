import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbonnementController } from './abonnement.controller';
import { AbonnementService } from './abonnement.service';
import { DatabaseModule } from 'src/database/database.module';
import { AbonnementProviders } from './abonnement';
import { NotificationGateway } from '../notification/notification.gateway';
import { PaymentService } from '../paiement/paiement.service';
import { NotificationService } from '../notification/notification.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AbonnementController],
  providers: [AbonnementService, NotificationGateway, PaymentService, NotificationService, ...AbonnementProviders],
})
export class AbonnementModule {}