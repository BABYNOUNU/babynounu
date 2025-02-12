import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Repository } from 'typeorm';
import { SettingDto } from './dto/setting.dto';
import { SlugUtils } from 'src/utils/slug.utils';
import specificNeeds from 'src/database/seeders/specificNeed.seed';
import agesOfChildrenSeeders from 'src/database/seeders/agesOfChildren.seed';
import specificNeedSeeders from 'src/database/seeders/specificNeed.seed';
import GuardScheduleSeeders from 'src/database/seeders/guardSchedule.seed';
import HouseKeeperSeeders from 'src/database/seeders/houseKeepers.seed';
import { ServiceFrequencieSeeders } from 'src/database/seeders/serviceFrequencies.seed';
import { SpecificSkillSeeders } from 'src/database/seeders/specificSkills.seed';
import { SpokenLanguageSeeders } from 'src/database/seeders/spokenLanguage.seed';
import { LocalizationSeeders } from 'src/database/seeders/localization.seed';
import { DesiredTimesSeeders } from 'src/database/seeders/schedule.seed';
import { PaymentTermSeeders } from 'src/database/seeders/paymentTerms.seed';
import { CertificationSeeders } from 'src/database/seeders/certification.seed';
import { RoleSeeders } from 'src/database/seeders/role.seed';
import { Roles } from '../role/models/role.model';
import { TypeProfilSeeders } from 'src/database/seeders/typesProfil.seed';
import { TypePaiementSeeders } from 'src/database/seeders/type.seed';
import { TypeParameter } from '../parameter/models/parameter_type.model';
import { typeParametresSeeders } from 'src/database/seeders/parameters/type.parameter.seed';
import { Parameter } from '../parameter/models/parameter.model';
import { Abonnements } from '../abonnement/models/abonnement.model';
import { Notification } from '../notification/models/notification.model';
import DisponibilyOfPrestataireSeeders from 'src/database/seeders/disponibly.seed';
import { TypeMediaSeeders } from 'src/database/seeders/typeMedia.seeder';
import { TaskSeeders } from 'src/database/seeders/tasks.seed';
import { CleaningSuppliesSeeders } from 'src/database/seeders/parameters/cleaningSupplies.seed';
import CandidateCriteriaSeeders from 'src/database/seeders/candidateCriteria.seed';
import { TypeServiceSeeders } from 'src/database/seeders/typeServices.seed';

@ApiTags('Setting')
@Controller('setting')
export class SettingController {
  constructor(
    @Inject('ROLE_REPOSITORY')
    private readonly roles: Repository<Roles>,

    @Inject('TYPE_PARAMETER_REPOSITORY')
    private readonly typeParameterRepository: Repository<TypeParameter>,
    @Inject('PARAMETER_REPOSITORY')
    private readonly parameterRepository: Repository<Parameter>,

    @Inject('ABONNEMENT_REPOSITORY')
    private readonly settingSubscriptionTypes: Repository<Abonnements>,

    @Inject('NOTIFICATION_REPOSITORY')
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  private async VerifyInParameter(
    Repository: any,
    AllParametre: {
      name: string;
      description: string;
      slug: string;
    }[],
  ) {
    let ToAdd = [];

    for (let index = 0; index < AllParametre.length; index++) {
      const element = AllParametre[index];
      const IsExistDb = await Repository.find({
        where: {
          name: element.name,
        },
      });

      if (
        IsExistDb.length === 0 ||
        !IsExistDb.find((db: any) => db.slug === element.slug)
      )
        ToAdd.push(element);
    }

    console.log(ToAdd);

    return ToAdd;
  }

  private async addAllTypeParametres(
    Repository: any,
    AllParametre: {
      name: string;
      description: string;
      slug: string;
    }[],
  ) {
    return Repository.insert(
      await this.VerifyInParameter(Repository, AllParametre),
    );
  }

  private async addAllParametres(
    Repository: any,
    AllParametre: {
      name: string;
      description: string;
      type_parameter: string;
      slug: string;
    }[],
  ) {
    return Repository.insert(
      await this.VerifyInParameter(Repository, AllParametre),
    );
  }

  @Post('seed/parametres/types')
  SeederParametreTypes() {
    return this.addAllTypeParametres(
      this.typeParameterRepository,
      typeParametresSeeders,
    );
  }

  // Get All Parents
  @Post('seed/age-of-children')
  SeederAgeOfChildren() {
    return this.addAllParametres(
      this.parameterRepository,
      agesOfChildrenSeeders,
    );
  }

  @Post('seed/specific-need')
  SeederSpecificNeed() {
    return this.addAllParametres(this.parameterRepository, specificNeedSeeders);
  }

  @Post('seed/guard-schedule')
  SeederGuardSchedule() {
    return this.addAllParametres(
      this.parameterRepository,
      GuardScheduleSeeders,
    );
  }

  @Post('seed/housekeeper')
  SeederHousekeeper() {
    return this.addAllParametres(this.parameterRepository, HouseKeeperSeeders);
  }

  @Post('seed/service-frequency')
  SeederServiceFrequency() {
    return this.addAllParametres(
      this.parameterRepository,
      ServiceFrequencieSeeders,
    );
  }

  @Post('seed/desired-times')
  SeederDesiredTimes() {
    return this.addAllParametres(this.parameterRepository, DesiredTimesSeeders);
  }

  @Post('seed/specific-skills')
  SeederSpecificSkills() {
    return this.addAllParametres(
      this.parameterRepository,
      SpecificSkillSeeders,
    );
  }

  @Post('seed/languages')
  SeederLanguages() {
    return this.addAllParametres(
      this.parameterRepository,
      SpokenLanguageSeeders,
    );
  }

  @Post('seed/localization')
  SeederLocalization() {
    return this.addAllParametres(this.parameterRepository, LocalizationSeeders);
  }

  @Post('seed/payment-terms')
  SeederPaymentTerms() {
    return this.addAllParametres(this.parameterRepository, PaymentTermSeeders);
  }

  @Post('seed/certifications')
  SeederCertifications() {
    return this.addAllParametres(
      this.parameterRepository,
      CertificationSeeders,
    );
  }

  @Post('seed/roles')
  SeederRoles() {
    return this.addAllParametres(this.parameterRepository, RoleSeeders);
  }

  @Post('seed/type_profil')
  SeederTypeProfil() {
    return this.addAllParametres(this.parameterRepository, TypeProfilSeeders);
  }

  @Post('seed/disponibility_of_prestataire')
  SeederDisponibilityOfPrestataire() {
    return this.addAllParametres(
      this.parameterRepository,
      DisponibilyOfPrestataireSeeders,
    );
  }

  @Post('seed/type_de_medias')
  SeederTypeMedia() {
    return this.addAllParametres(this.parameterRepository, TypeMediaSeeders);
  }

  @Post('seed/cleaning-supplies')
  SeederCleaningSupplies() {
    return this.addAllParametres(
      this.parameterRepository,
      CleaningSuppliesSeeders,
    );
  }

  @Post('seed/tasks')
  SeederTasks() {
    return this.addAllParametres(this.parameterRepository, TaskSeeders);
  }

  @Post('seed/candidate-criteria')
  SeederCandidateCriteria() {
    return this.addAllParametres(
      this.parameterRepository,
      CandidateCriteriaSeeders,
    );
  }

  @Post('seed/type-de-services')
  SeederTypeDeServices() {
    return this.addAllParametres(this.parameterRepository, TypeServiceSeeders);
  }

  @Post('seed/remove-doublon-abonnements')
  async RemoveDoublonAbonnements() {
    return this.settingSubscriptionTypes
      .createQueryBuilder('abonnements')
      .select([
        'COUNT(abonnements.id) as count',
        'abonnements.userId',
        'abonnements.paiementId',
      ])
      .groupBy('abonnements.userId, abonnements.paiementId')
      .having('count > 1')
      .getRawMany()
      .then(async (result) => {
        for (const row of result) {
          // Les noms de colonnes brutes utilisent des underscores
          const userId = row.abonnements_userId;
          const paiementId = row.abonnements_paiementId;

          // Recherche des doublons avec les relations
          const subscriptions = await this.settingSubscriptionTypes.find({
            where: {
              user: { id: userId },
              paiement: { id: paiementId },
            },
            relations: ['user', 'paiement', 'type'],
          });

          if (subscriptions.length > 1) {
            const toKeep = subscriptions[0];
            const toRemove = subscriptions.slice(1);

            // Suppression des doublons
            await this.settingSubscriptionTypes.remove(toRemove);

            // Mise à jour de l'entrée conservée si nécessaire
            toKeep.updatedAt = new Date();
            await this.settingSubscriptionTypes.save(toKeep);
          }
        }
      });
  }

  @Post('seed/remove-doublon-notifications')
  async RemoveDoublonNotifications() {
    return this.notificationRepository
      .createQueryBuilder('notifications')
      .select([
        'COUNT(notifications.id) as count',
        'notifications.user',
        'notifications.type',
        'notifications.job',
      ]) // Incluez les champs nécessaires
      .groupBy('notifications.user, notifications.type, notifications.job') // Groupe par user, type et job
      .having('count > 1')
      .getRawMany()
      .then(async (result) => {
        for (const row of result) {
          const userId = row.notifications_user; // Utilisez les noms avec underscores
          const type = row.notifications_type;
          const jobId = row.notifications_job; // Assurez-vous que le nom correspond à votre relation

          const notifications = await this.notificationRepository.find({
            where: {
              user: { id: userId },
              type: type,
              job: { id: jobId }, // Utilisez l'ID du job si la relation est avec un Job
            },
            relations: ['user', 'job', 'sender'], // Incluez les relations nécessaires
          });

          if (notifications.length > 1) {
            const toKeep = notifications[0];
            const toRemove = notifications.slice(1);

            await this.notificationRepository.remove(toRemove);

            toKeep.updatedAt = new Date();
            await this.notificationRepository.save(toKeep);
          }
        }
      });
  }
}
