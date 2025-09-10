import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { Notification } from './models/notification.model';
import { Abonnements } from '../abonnement/models/abonnement.model';
import { Paiements } from '../paiement/models/paiement.model';
import { ProfilNounus } from '../nounus/models/nounu.model';
import { Medias } from '../media/models/media.model';
import { Preference } from '../Preference/models/preference.model';
import { Parameter } from '../parameter/models/parameter.model';
import { AbonnementService } from '../abonnement/abonnement.service';
import { PaymentService } from '../paiement/paiement.service';
import { NounusService } from '../nounus/nounus.service';
import { MediaService } from '../media/media.service';
import { ParameterService } from '../parameter/parameter.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Notification,
      Abonnements,
      Paiements,
      ProfilNounus,
      Medias,
      Preference,
      Parameter
    ])
  ],
  controllers: [NotificationController],
  providers: [
    NotificationService,
    PaymentService,
    AbonnementService,
    NounusService,
    MediaService,
    ParameterService
  ],
  exports: [NotificationService, TypeOrmModule]
})
export class NotificationModule {}
