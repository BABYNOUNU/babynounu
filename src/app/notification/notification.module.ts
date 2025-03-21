import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { NotificationProviders } from './notification';
import { DatabaseModule } from 'src/database/database.module';
import { AbonnementService } from '../abonnement/abonnement.service';
import { AbonnementProviders } from '../abonnement/abonnement';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController],
  providers: [NotificationService, ...NotificationProviders], 
})
export class NotificationModule {}
