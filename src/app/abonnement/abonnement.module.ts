import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbonnementController } from './abonnement.controller';
import { AbonnementService } from './abonnement.service';
import { Abonnements } from './models/abonnement.model';
import { Paiements } from '../paiement/models/paiement.model';
import { Notification } from '../notification/models/notification.model';
import { ProfilNounus } from '../nounus/models/nounu.model';
import { Medias } from '../media/models/media.model';
import { Parameter } from '../parameter/models/parameter.model';
import { Preference } from '../preference/models/preference.model';
import { PaymentService } from '../paiement/paiement.service';
import { NotificationService } from '../notification/notification.service';
import { NounusService } from '../nounus/nounus.service';
import { MediaService } from '../media/media.service';
import { ParameterService } from '../parameter/parameter.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Abonnements,
      Paiements,
      Notification,
      ProfilNounus,
      Medias,
      Parameter,
      Preference
    ])
  ],
  controllers: [AbonnementController],
  providers: [
    AbonnementService,
    PaymentService,
    NotificationService,
    NounusService,
    MediaService,
    ParameterService
  ],
  exports: [AbonnementService, TypeOrmModule]
})
export class AbonnementModule {}
