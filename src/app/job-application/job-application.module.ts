import { Module, Inject } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobApplicationController } from './job-application.controller';
import { JobApplicationsService } from './job-application.service';
import { JobApplication } from './models/job-application.model';
import { Job } from '../job/models/job.model';
import { User } from '../user/user.model';
import { Notification } from '../notification/models/notification.model';
import { Abonnements } from '../abonnement/models/abonnement.model';
import { Paiements } from '../paiement/models/paiement.model';
import { ProfilNounus } from '../nounus/models/nounu.model';
import { Medias } from '../media/models/media.model';
import { Parameter } from '../parameter/models/parameter.model';
import { Preference } from '../Preference/models/preference.model';
import { NotificationService } from '../notification/notification.service';
import { AbonnementService } from '../abonnement/abonnement.service';
import { PaymentService } from '../paiement/paiement.service';
import { NounusService } from '../nounus/nounus.service';
import { MediaService } from '../media/media.service';
import { ParameterService } from '../parameter/parameter.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      JobApplication,
      Job,
      User,
      Notification,
      Abonnements,
      Paiements,
      ProfilNounus,
      Medias,
      Parameter,
      Preference
    ])
  ],
  controllers: [JobApplicationController],
  providers: [
    JobApplicationsService,
    NotificationService,
    AbonnementService,
    PaymentService,
    NounusService,
    MediaService,
    ParameterService
  ],
  exports: [JobApplicationsService, TypeOrmModule]
})
export class JobApplicationModule {}
