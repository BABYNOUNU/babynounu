import { Module } from '@nestjs/common';
import { PaymentController } from './paiement.controller';
import { PaymentService } from './paiement.service';
import { PaiementProviders } from './paiement';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PaymentController],
  providers: [PaymentService, ...PaiementProviders]
})
export class PaiementModule {}
