import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Post,
} from '@nestjs/common';
import { SettingGuardScheduleController } from './_partiels/controllers/setting_guard_schedule.controller';
import { ApiTags } from '@nestjs/swagger';
import { SettingGeneraleService } from './_partiels/general.service';
import { Repository } from 'typeorm';
import { SettingAgeOfChildren } from './models/setting_age_of_children.model';
import { SettingDto } from './dto/setting.dto';
import { SlugUtils } from 'src/utils/slug.utils';
import specificNeeds from 'src/database/seeders/specificNeed.seed';
import { SettingSpecificNeed } from './models/setting_specific_need.model';
import agesOfChildrenSeeders from 'src/database/seeders/agesOfChildren.seed';
import specificNeedSeeders from 'src/database/seeders/specificNeed.seed';
import { SettingGuardSchedules } from './models/setting_guard_schedule.model';
import GuardScheduleSeeders from 'src/database/seeders/guardSchedule.seed';
import { SettingHousekeeper } from './models/setting_housekeeper.model';
import HouseKeeperSeeders from 'src/database/seeders/houseKeepers.seed';
import { SettingServiceFrequency } from './models/setting_service_frequency.model';
import { ServiceFrequencieSeeders } from 'src/database/seeders/serviceFrequencies.seed';
import { SettingDesiredTime } from './models/setting_desired_time.model';
import { SettingSpecificSkills } from './models/setting_specific_skill.model';
import { SpecificSkillSeeders } from 'src/database/seeders/specificSkills.seed';
import { SettingLanguages } from './models/setting_language.model';
import { SpokenLanguageSeeders } from 'src/database/seeders/spokenLanguage.seed';
import { SettingLocalization } from './models/setting_localization.model';
import { LocalizationSeeders } from 'src/database/seeders/localization.seed';
import { DesiredTimesSeeders } from 'src/database/seeders/schedule.seed';
import { SettingPaymentTerms } from './models/setting_payment_terms.model';
import { PaymentTermSeeders } from 'src/database/seeders/paymentTerms.seed';
import { SettingCertifications } from './models/setting_certification.model';
import { CertificationSeeders } from 'src/database/seeders/certification.seed';
import { RoleSeeders } from 'src/database/seeders/role.seed';
import { Roles } from '../role/models/role.model';
import { SettingTypeProfil } from './models/setting_type_profil.model';
import { TypeProfilSeeders } from 'src/database/seeders/typesProfil.seed';

@ApiTags('Setting')
@Controller('setting')
export class SettingController {
  constructor(
    @Inject('SETTING_AGE_OF_CHILDREN_REPOSITORY')
    private readonly settingAgeOfChildrenRepository: Repository<SettingAgeOfChildren>,
    @Inject('SETTING_SPECIFIC_NEED_REPOSITORY')
    private readonly settingSpecificNeed: Repository<SettingSpecificNeed>,
    @Inject('SETTING_GUARD_SCHEDULE_REPOSITORY')
    private readonly settingGuardSchelude: Repository<SettingGuardSchedules>,
    @Inject('SETTING_HOUSEKEEPER_REPOSITORY')
    private readonly settingHousekeeper: Repository<SettingHousekeeper>,
    @Inject('SETTING_SERVICE_FREQUENCY_REPOSITORY')
    private readonly settingServiceFrequency: Repository<SettingServiceFrequency>,
    @Inject('SETTING_DESIRE_TIMES_REPOSITORY')
    private readonly settingDesiredTime: Repository<SettingDesiredTime>,
    @Inject('SETTING_SPECIFIC_SKILL_REPOSITORY')
    private readonly settingSpecificSkills: Repository<SettingSpecificSkills>,
    @Inject('SETTING_LANGUAGE_REPOSITORY')
    private readonly settingLanguages: Repository<SettingLanguages>,
    @Inject('SETTING_LOCALIZATION_REPOSITORY')
    private readonly settingLocalization: Repository<SettingLocalization>,
    @Inject('SETTING_PAYMENT_TERMS_REPOSITORY')
    private readonly settingPaymentTerms: Repository<SettingPaymentTerms>,
    @Inject('SETTING_CERTIFICATION_REPOSITORY')
    private readonly settingCertification: Repository<SettingCertifications>,

    @Inject('ROLE_REPOSITORY')
    private readonly roles: Repository<Roles>,
    @Inject('TYPE_PROFIL_REPOSITORY')
    private readonly settingTypeProfil: Repository<SettingTypeProfil>,
    
    
  ) {}

  private removeDuplicatesByName(array1, array2) {
    // Créer un Set contenant les valeurs de "name" dans le second tableau
    const namesInArray2 = new Set(array2.map((item) => item.name));
  
    // Filtrer le premier tableau pour ne conserver que les objets avec un "name" absent dans le second tableau
    const filteredArray1 = array1.filter((item) => !namesInArray2.has(item.name));
  
    // Créer un Set contenant les valeurs de "name" dans le premier tableau
    const namesInArray1 = new Set(array1.map((item) => item.name));
  
    // Filtrer le second tableau pour ne conserver que les objets avec un "name" absent dans le premier tableau
    const filteredArray2 = array2.filter((item) => !namesInArray1.has(item.name));
  
    // Fusionner les deux tableaux filtrés
    return [...filteredArray1, ...filteredArray2];
  }

  private async createSeeder(
    Repository: Repository<any>,
    createSeederBody: any,
  ) {
    let settingSave: any;
    let isNext = 0;

    const IsNameExist = await Repository.find();

    for (let index = 0; index < this.removeDuplicatesByName(createSeederBody, IsNameExist).length; index++) {
      const Seeder = this.removeDuplicatesByName(createSeederBody, IsNameExist)[index];

      
      Seeder.slug = await new SlugUtils().all(Seeder.name, Repository);

      // CREATE NEW SETTING
      const newSetting = Repository.create({
        slug: Seeder.slug,
        name: Seeder.name,
        description: Seeder.description,
      });
      settingSave = await Repository.save(newSetting);
    }

    if (!settingSave) {
      throw new BadRequestException({ message: 'Setting not created' });
    }

    // RETURN DATA USER CREATE
    return {
      setting: {
        ...settingSave,
      },
    };
  }

  // Get All Parents
  @Post('seed/age-of-children')
  SeederAgeOfChildren() {
    return this.createSeeder(
      this.settingAgeOfChildrenRepository,
      agesOfChildrenSeeders,
    );
  }

  @Post('seed/specific-need')
  SeederSpecificNeed() {
    return this.createSeeder(
      this.settingSpecificNeed,
      specificNeedSeeders,
    );
  }

  @Post('seed/guard-schedule')
  SeederGuardSchedule() {
    return this.createSeeder(
      this.settingGuardSchelude,
      GuardScheduleSeeders,
    );
  }

  @Post('seed/housekeeper')
  SeederHousekeeper() {
    return this.createSeeder(
      this.settingHousekeeper,
      HouseKeeperSeeders,
    );
  }


  @Post('seed/service-frequency')
  SeederServiceFrequency() {
    return this.createSeeder(
      this.settingServiceFrequency,
      ServiceFrequencieSeeders,
    );
  }


  @Post('seed/desired-times')
  SeederDesiredTimes() {
    return this.createSeeder(
      this.settingDesiredTime,
      DesiredTimesSeeders,
    );
  }

  @Post('seed/specific-skills')
  SeederSpecificSkills() {
    return this.createSeeder(
      this.settingSpecificSkills,
      SpecificSkillSeeders,
    );
  }

  @Post('seed/languages')
  SeederLanguages() {
    return this.createSeeder(
      this.settingLanguages,
      SpokenLanguageSeeders,
    );
  }

  @Post('seed/localization')
  SeederLocalization() {
    return this.createSeeder(
      this.settingLocalization,
      LocalizationSeeders,
    );
  }

  @Post('seed/payment-terms')
  SeederPaymentTerms() {
    return this.createSeeder(
      this.settingPaymentTerms,
      PaymentTermSeeders,
    );
  }


  @Post('seed/certifications')
  SeederCertifications() {
    return this.createSeeder(
      this.settingCertification,
      CertificationSeeders, 
    );
  }

  @Post('seed/roles')
  SeederRoles() {
    return this.createSeeder(
      this.roles,
      RoleSeeders, 
    );
  }

  @Post('seed/type_profil')
  SeederTypeProfil() {
    return this.createSeeder(
      this.settingTypeProfil,
      TypeProfilSeeders, 
    );
  }

}
