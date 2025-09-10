import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from './paiement.controller';
import { PaymentService } from './paiement.service';
import { Paiements } from './models/paiement.model';
import { Notification } from '../notification/models/notification.model';
import { Abonnements } from '../abonnement/models/abonnement.model';
import { ProfilNounus } from '../nounus/models/nounu.model';
import { Preference } from '../Preference/models/preference.model';
import { Medias } from '../media/models/media.model';
import { Parameter } from '../parameter/models/parameter.model';
import { NotificationService } from '../notification/notification.service';
import { AbonnementService } from '../abonnement/abonnement.service';
import { NounusService } from '../nounus/nounus.service';
import { MediaService } from '../media/media.service';
import { ParameterService } from '../parameter/parameter.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Paiements,
      Notification,
      Abonnements,
      ProfilNounus,
      Preference,
      Medias,
      Parameter
    ])
  ],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    AbonnementService,
    NotificationService,
    NounusService,
    MediaService,
    ParameterService
  ],
  exports: [PaymentService, TypeOrmModule]
})
export class PaiementModule {}
