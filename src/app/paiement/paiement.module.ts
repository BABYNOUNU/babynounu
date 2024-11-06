import { Module } from '@nestjs/common';
import { PaiementController } from './paiement.controller';
import { PaiementService } from './paiement.service';
import { Paiement } from './paiement';

@Module({
  controllers: [PaiementController],
  providers: [PaiementService, Paiement]
})
export class PaiementModule {}
