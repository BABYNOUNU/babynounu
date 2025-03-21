import { Module, Inject } from '@nestjs/common';
import { JobApplicationController } from './job-application.controller';
import { JobApplicationsService } from './job-application.service';
import { JobApplicationProviders } from './job-application';
import { DatabaseModule } from 'src/database/database.module';
import { NotificationService } from '../notification/notification.service';
import { NotificationProviders } from '../notification/notification';
import { AbonnementService } from '../abonnement/abonnement.service';
import { AbonnementProviders } from '../abonnement/abonnement';
import { PaymentService } from '../paiement/paiement.service';
import { PaiementProviders } from '../paiement/paiement';

@Module({
  imports: [DatabaseModule],
  controllers: [JobApplicationController],
  providers: [
    JobApplicationsService,
    NotificationService,
    AbonnementService,
    PaymentService,
    ...PaiementProviders,
    ...AbonnementProviders,
    ...NotificationProviders,
    ...JobApplicationProviders,
  ],
})
export class JobApplicationModule {}
