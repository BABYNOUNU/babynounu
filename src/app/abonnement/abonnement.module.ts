import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbonnementController } from './abonnement.controller';
import { AbonnementService } from './abonnement.service';
import { DatabaseModule } from 'src/database/database.module';
import { AbonnementProviders } from './abonnement';
import { NotificationGateway } from '../notification/notification.gateway';

@Module({
  imports: [DatabaseModule],
  controllers: [AbonnementController],
  providers: [AbonnementService, NotificationGateway, ...AbonnementProviders],
})
export class AbonnementModule {}