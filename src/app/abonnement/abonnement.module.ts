import { Module } from '@nestjs/common';
import { AbonnementController } from './abonnement.controller';
import { AbonnementService } from './abonnement.service';
import { Abonnement } from './abonnement';

@Module({
  controllers: [AbonnementController],
  providers: [AbonnementService, Abonnement]
})
export class AbonnementModule {}
