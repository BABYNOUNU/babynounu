import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Parents } from './models/parent.model';
import { Repository } from 'typeorm';
import { CreateParentDto } from './dto/create-parent.dto';
import { User } from '../user/user.model';
import { ParentSettingLanguages } from '../parent/models/parent_setting_languages.model';
import { ParentSettingLocalizations } from './models/parent_setting_localization.model';
import { ParentSettingAgeOfChildrens } from './models/parent_setting_age_of_children.model';
import { ParentSettingDeriredTimes } from './models/parent_setting_desired_time.model';
import { ParentSettingAreaWork } from './models/parent_settring_area_work.model';
import { SettingAgeOfChildren } from '../setting/models/setting_age_of_children.model';
import { SettingLocalization } from '../setting/models/setting_localization.model';
import { SettingDesiredTime } from '../setting/models/setting_desired_time.model';
import { SettingCertifications } from '../setting/models/setting_certification.model';
import { SettingSpecificSkills } from '../setting/models/setting_specific_skill.model';
import { ParentSettingSpecificSkills } from './models/parent_settring_specific_skill.model';
import { SettingLanguages } from '../setting/models/setting_language.model';
import { ParentSettingSpecificNeeds } from './models/parent_setting_specific_need.model';
import { SettingSpecificNeed } from '../setting/models/setting_specific_need.model';
import { ParentSettingGuardSchedules } from './models/parent_setting_guard_schedules.model';
import { SettingGuardSchedules } from '../setting/models/setting_guard_schedule.model';

@Injectable()
export class ParentService {
  constructor(
    @Inject('PARENT_SEETING_LANGUAGE_REPOSITORY')
    private readonly parentSettingLanguagesRepository: Repository<ParentSettingLanguages>,
    @Inject('SEETING_LANGUAGE_REPOSITORY')
    private readonly settingLanguagesRepository: Repository<SettingLanguages>,
    @Inject('PARENT_SETTING_LOCALIZATION_REPOSITORY')
    private readonly parentSettingLocalizationsRepository: Repository<ParentSettingLocalizations>,
    @Inject('PARENT_SETTING_AGE_OF_CHILDRENS_REPOSITORY')
    private readonly parentSettingAgeOfChildrensRepository: Repository<ParentSettingAgeOfChildrens>,
    @Inject('PARENT_SETTING_DESIREDTIMES_REPOSITORY')
    private readonly parentSettingDesiredTimesRepository: Repository<ParentSettingDeriredTimes>,
    @Inject('PARENT_SETTING_AREA_WORK_REPOSITORY')
    private readonly parentSettingAreaWorksRepository: Repository<ParentSettingAreaWork>,
    @Inject('SETTING_AGE_OF_CHILDRENS_REPOSITORY')
    private readonly settingAgeOfChildrensRepository: Repository<SettingAgeOfChildren>,
    @Inject('SETTING_LOCALIZATION_REPOSITORY')
    private readonly settingLocalizationsRepository: Repository<SettingLocalization>,
    @Inject('SETTING_DESIRED_TIME_REPOSITORY')
    private readonly settingDesiredTimesRepository: Repository<SettingDesiredTime>,
    @Inject('SETTING_SPECIFIC_SKILLS_REPOSITORY')
    private readonly settingSpecificSkillsRepository: Repository<SettingSpecificSkills>,
    @Inject('PARENT_SETTING_SPECIFIC_SKILLS_REPOSITORY')
    private readonly parentSettingSpecificSkillsRepository: Repository<ParentSettingSpecificSkills>,
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
    @Inject('PARENT_REPOSITORY') private parentsRepository: Repository<Parents>,
    @Inject('PARENT_SETTING_SPECIFIC_NEEDS_REPOSITORY')
    private readonly parentSettingSpecificNeedsRepository: Repository<ParentSettingSpecificNeeds>,
    @Inject('SETTING_SPECIFIC_NEEDS_REPOSITORY')
    private readonly settingSpecificNeedsRepository: Repository<SettingSpecificNeed>,
    @Inject('PARENT_SETTING_GUARD_SCHEDULES_REPOSITORY')
    private readonly parentSettingGuardSchedulesRepository: Repository<ParentSettingGuardSchedules>,
    @Inject('SETTING_GUARD_SCHEDULE_REPOSITORY')
    private readonly settingGuardSchedulesRepository: Repository<SettingGuardSchedules>,
  ) {}

  async Parents(): Promise<Parents[]> {
    return this.parentsRepository.find();
  }

  async Parent(ParentsWhereUniqueInput: any): Promise<Parents | null> {
    const parent = await this.parentsRepository.findOne({
      where: { id: ParentsWhereUniqueInput },
      relations: [
        'settingLanguages.language',
        'settingAgeOfChildrens.AgeOfChildrens',
        'settingDesiredTimes.time',
        'settingAreaWorks.area',
        'settingSpecificSkills.skill',
        'settingSpecificNeeds.SpecificNeeds',
        'settingGuardSchedules.GuardSchedules',
        'settingHousekeepers.Housekeepers',
      ],
    });

    if (!parent) {
      throw new BadRequestException({ message: 'Parent not found' });
    }

    return parent;
  }

  async create(
    createParentDto: CreateParentDto,
    files: { profil_image?: Express.Multer.File[] },
  ) {
    if (!files || !files.profil_image?.length) {
      throw new BadRequestException('At least one image is required');
    }

    // Création initiale du parent
    const parent = this.parentsRepository.create({
      fullname: createParentDto.fullname,
      phone: createParentDto.phone,
      number_of_children: createParentDto.number_of_children,
      localization: createParentDto.localization,
      adresse: createParentDto.adresse,
      payment_terms: createParentDto.payment_terms,
      budget_min: createParentDto.budget_min,
      budget_max: createParentDto.budget_max,
      availabilityServiceProvider: createParentDto.availabilityServiceProvider,
      description: createParentDto.description,
      photo: `/uploads/${files.profil_image[0].filename}`,
    });

    const saveParent = await this.parentsRepository.save(parent);

    if (!saveParent) {
      throw new BadRequestException({ message: 'Parent not created' });
    }

    // Création des relations
    await this.userRepository.update(
      { id: createParentDto.user },
      { parent: saveParent },
    );

    // Fonction générique pour créer des relations
    async function createRelation(
      items: any[],
      repository: Repository<any>,
      relationName: string,
    ) {
      if (!Array.isArray(items) || items.length === 0) {
        return [];
      }

      return Promise.all(
        items.map(async (item: string) => {
          const entity = await repository.findOne({ where: { name: item } });
          if (!entity) {
            throw new Error(`Entity not found for item: ${item}`);
          }
          return {
            [relationName]: entity,
            parent: saveParent,
          };
        }),
      );
    }

    // Liste des relations à créer
    const relations: any = [
      {
        items: createParentDto.settingLanguages,
        repository: this.settingLanguagesRepository,
        relationName: 'language',
        targetRepository: this.parentSettingLanguagesRepository,
        targetField: 'settingLanguages',
      },
      {
        items: createParentDto.settingAgeOfChildrens,
        repository: this.settingAgeOfChildrensRepository,
        relationName: 'AgeOfChildrens',
        targetRepository: this.parentSettingAgeOfChildrensRepository,
        targetField: 'settingAgeOfChildrens',
      },
      {
        items: createParentDto.settingDesiredTimes,
        repository: this.settingDesiredTimesRepository,
        relationName: 'time',
        targetRepository: this.parentSettingDesiredTimesRepository,
        targetField: 'settingDesiredTimes',
      },
      {
        items: createParentDto.settingAreaWorks,
        repository: this.settingLocalizationsRepository,
        relationName: 'area',
        targetRepository: this.parentSettingAreaWorksRepository,
        targetField: 'settingAreaWorks',
      },
      {
        items: createParentDto.settingSpecificSkills,
        repository: this.settingSpecificSkillsRepository,
        relationName: 'skill',
        targetRepository: this.parentSettingSpecificSkillsRepository,
        targetField: 'settingSpecificSkills',
      },
      {
        items: createParentDto.settingSpecificNeeds,
        repository: this.settingSpecificNeedsRepository,
        relationName: 'SpecificNeeds',
        targetRepository: this.parentSettingSpecificNeedsRepository,
        targetField: 'settingSpecificNeeds',
      },
      {
        items: createParentDto.settingGuardSchedules,
        repository: this.settingGuardSchedulesRepository,
        relationName: 'GuardSchedules',
        targetRepository: this.parentSettingGuardSchedulesRepository,
        targetField: 'settingGuardSchedules',
      },
    ];

    // Création des relations dynamiquement
    for (const relation of relations) {
      const objects = await createRelation(
        relation.items,
        relation.repository,
        relation.relationName,
      );

      const entities = relation.targetRepository.create(objects);
      saveParent[relation.targetField] =
        await relation.targetRepository.save(entities);
    }

    const GetProfilParent = await this.parentsRepository.findOne({
      where: { id: saveParent.id },
      relations: ['user'],
    });

    return GetProfilParent;
  }

  async UpdateParent(): Promise<Parents> {
    const newParents = this.parentsRepository.create({});

    return await this.parentsRepository.save(newParents);
  }

  async DeleteParent(where: any) {
    this.parentsRepository.delete({ id: where });
    return { message: 'Parents deleted' };
  }
}
