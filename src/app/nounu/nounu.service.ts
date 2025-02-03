import { BadRequestException, Inject } from '@nestjs/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Not, Repository } from 'typeorm';
import { Nounus } from './models/nounu.model';
import { NounuSettings } from './models/nounu_setting.model';
import { CreateNounuDto } from './dto/create-nounu.dto';
import { UpdateNounuDto } from './dto/update-nounu.dto';
import { SettingLanguages } from '../setting/models/setting_language.model';
import { NounuSettingLanguages } from './models/nounu_setting_languages.model';
import { NounuSettingLocalizations } from './models/nounu_setting_localization.model';
import { NounuSettingAgeOfChildrens } from './models/nounu_setting_age_of_children.model';
import { NounuSettingCertifications } from './models/nounu_setting_certification.model';
import { NounuSettingDeriredTimes } from './models/nounu_setting_desired_time.model';
import { NounuSettingAreaWork } from './models/nounu_settring_area_work.model';
import { SettingAgeOfChildren } from '../setting/models/setting_age_of_children.model';
import { SettingLocalization } from '../setting/models/setting_localization.model';
import { SettingCertifications } from '../setting/models/setting_certification.model';
import { User } from '../user/user.model';
import { SettingDesiredTime } from '../setting/models/setting_desired_time.model';
import { SettingSpecificSkills } from '../setting/models/setting_specific_skill.model';
import { NounuSettingSpecificSkills } from './models/nounu_settring_specific_skill.model';
import { MediaService } from '../media/media.service';
import { Medias } from '../media/models/media.model';

@Injectable()
export class NounuService extends MediaService {
  constructor(
    @Inject('NOUNU_REPOSITORY')
    private readonly nounuRepository: Repository<Nounus>,
    @Inject('NOUNU_SETTING_REPOSITORY')
    private readonly nounuSettingsRepository: Repository<NounuSettings>,
    @Inject('NOUNU_SEETING_LANGUAGE_REPOSITORY')
    private readonly nounuSettingLanguagesRepository: Repository<NounuSettingLanguages>,
    @Inject('SEETING_LANGUAGE_REPOSITORY')
    private readonly settingLanguagesRepository: Repository<SettingLanguages>,
    @Inject('NOUNU_SETTING_LOCALIZATION_REPOSITORY')
    private readonly nounuSettingLocalizationsRepository: Repository<NounuSettingLocalizations>,
    @Inject('NOUNU_SETTING_AGE_OF_CHILDRENS_REPOSITORY')
    private readonly nounuSettingAgeOfChildrensRepository: Repository<NounuSettingAgeOfChildrens>,
    @Inject('NOUNU_SETTING_CERTIFICATION_REPOSITORY')
    private readonly nounuSettingCertificationsRepository: Repository<NounuSettingCertifications>,
    @Inject('NOUNU_SETTING_DESIREDTIMES_REPOSITORY')
    private readonly nounuSettingDesiredTimesRepository: Repository<NounuSettingDeriredTimes>,
    @Inject('NOUNU_SETTING_AREA_WORK_REPOSITORY')
    private readonly nounuSettingAreaWorksRepository: Repository<NounuSettingAreaWork>,

    @Inject('SETTING_AGE_OF_CHILDRENS_REPOSITORY')
    private readonly settingAgeOfChildrensRepository: Repository<SettingAgeOfChildren>,
    @Inject('SETTING_LOCALIZATION_REPOSITORY')
    private readonly settingLocalizationsRepository: Repository<SettingLocalization>,
    @Inject('SETTING_DESIRED_TIME_REPOSITORY')
    private readonly settingDesiredTimesRepository: Repository<SettingDesiredTime>,
    @Inject('SETTING_CERTIFICATION_REPOSITORY')
    private readonly settingCertificationsRepository: Repository<SettingCertifications>,
    @Inject('SETTING_SPECIFIC_SKILLS_REPOSITORY')
    private readonly settingSpecificSkillsRepository: Repository<SettingSpecificSkills>,
    @Inject('NOUNU_SETTING_SPECIFIC_SKILLS_REPOSITORY')
    private readonly nounuSettingSpecificSkillsRepository: Repository<NounuSettingSpecificSkills>,
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
    @Inject('MEDIA_REPOSITORY')
    private readonly mediaRepository: Repository<Medias>,
  ) {
    super();
  }

  async create(
    createNounuDto: CreateNounuDto,
    files: {
      profil_image?: Express.Multer.File[];
      document?: Express.Multer.File[];
      gallery?: Express.Multer.File[];
    },
  ) {
    if (!files) {
      throw new BadRequestException('At least one image is required');
    }

    const nounu = this.nounuRepository.create({
      fullname: createNounuDto.fullname,
      old: createNounuDto.old,
      phone: createNounuDto.phone,
      adresse: createNounuDto.adresse,
      year_experience: createNounuDto.year_experience,
      reference_1: createNounuDto.reference_1,
      reference_2: createNounuDto.reference_2,
      reference_3: createNounuDto.reference_3,
      hourly_rate: createNounuDto.hourly_rate,
      biographie: createNounuDto.biographie,
      monthly_rate: createNounuDto.monthly_rate,
      emergencie: createNounuDto.emergencie,
      confirmed_identity: `/uploads/${files.document[0].filename}`,
      pricing_flexibility: createNounuDto.pricing_flexibility,
      photo: `/uploads/${files.profil_image[0].filename}`,
      user: { id: createNounuDto.user },
    });
    const saveNounu = await this.nounuRepository.save(nounu);

    if (!saveNounu) {
      throw new BadRequestException({ message: 'Nounu not created' });
    }

    // Ajout des images de galerie
    for (const file of files.gallery) {
      const imagePath = `/uploads/${file.filename}`;
      this.createMedia(
        {
          url: imagePath,
          media_nounu: saveNounu,
        },
        this.mediaRepository,
      );
    }

    async function createRelation(
      items: any[],
      repository: Repository<any>,
      relationName: string,
    ) {
      if (!Array.isArray(items) || items.length === 0) {
        throw new Error(`Invalid items: ${items}`);
      } 

      const relationObjects = await Promise.all(
        items.map(async (item: any) => {
          item = JSON.parse(item);
          const entity = await repository.findOne({
            where: { name: item.name }, // Associe selon le nom ou un autre critère
          });

          if (!entity) {
            throw new Error(`Entity not found for item: ${item}`);
          }

          return {
            [relationName]: entity,
            nounu: saveNounu, // Association avec l'entité principale
          };
        }),
      );

      return relationObjects;
    }

    // Création des relations entre les entités
    // Création des langues
    const langObjects = await createRelation(
      createNounuDto.settingLanguages,
      this.settingLanguagesRepository,
      'language',
    );
    const langEntities =
      this.nounuSettingLanguagesRepository.create(langObjects);
    saveNounu.settingLanguages =
      await this.nounuSettingLanguagesRepository.save(langEntities);

    // Création des Ages
    const AgeObjects = await createRelation(
      createNounuDto.settingAgeOfChildrens,
      this.settingAgeOfChildrensRepository,
      'AgeOfChildrens',
    );
    const AgeEntities =
      this.nounuSettingAgeOfChildrensRepository.create(AgeObjects);
    saveNounu.settingAgeOfChildrens =
      await this.nounuSettingAgeOfChildrensRepository.save(AgeEntities);

    // Création des certifications
    const certObjects = await createRelation(
      createNounuDto.settingCertifications,
      this.settingCertificationsRepository,
      'certification',
    );
    const certEntities =
      this.nounuSettingCertificationsRepository.create(certObjects);
    saveNounu.settingCertifications =
      await this.nounuSettingCertificationsRepository.save(certEntities);

    // Création des temps désirés
    const timeObjects = await createRelation(
      createNounuDto.settingDesiredTimes,
      this.settingDesiredTimesRepository,
      'time',
    );
    const timeEntities =
      this.nounuSettingDesiredTimesRepository.create(timeObjects);
    saveNounu.settingDesiredTimes =
      await this.nounuSettingDesiredTimesRepository.save(timeEntities);

    // Création des zones de travail
    const areaObjects = await createRelation(
      createNounuDto.settingAreaWorks,
      this.settingLocalizationsRepository,
      'area',
    );
    const areaEntities =
      this.nounuSettingAreaWorksRepository.create(areaObjects);
    saveNounu.settingAreaWorks =
      await this.nounuSettingAreaWorksRepository.save(areaEntities);

    // Création des compétences spécifiques
    const skillObjects = await createRelation(
      createNounuDto.settingSpecificSkills,
      this.settingSpecificSkillsRepository,
      'skill',
    );
    const skillEntities =
      this.nounuSettingSpecificSkillsRepository.create(skillObjects);
    saveNounu.settingSpecificSkills =
      await this.nounuSettingSpecificSkillsRepository.save(skillEntities);

    const GetProfilNounu = await this.nounuRepository.findOne({
      where: { id: saveNounu.id },
      relations: ['user'],
    });

    return GetProfilNounu;
  }

  async findAll(userId: any): Promise<Nounus[]> {
    return this.nounuRepository.find({
      where: {
        user: {
          email: Not(userId),
        },
      },
      relations: [
        'settingLanguages.language',
        'settingDesiredTimes.time',
        'user',
        'media',
      ],
    });
  }

  async findOne(id: string): Promise<Nounus> {
    const nounu = await this.nounuRepository.findOne({
      where: { id },
      relations: [
        'settingLanguages.language',
        'settingDesiredTimes.time',
        'settingAreaWorks.area',
        'settingSpecificSkills.skill',
        'settingAgeOfChildrens.AgeOfChildrens',
        'settingCertifications.certification',
        'user',
        'media',
      ],
    });
    if (!nounu) {
      throw new NotFoundException(`Nounu with ID ${id} not found`);
    }
    return nounu;
  }

  async update(id: string, updateNounuDto: UpdateNounuDto): Promise<Nounus> {
    const nounu = await this.findOne(id);
    Object.assign(nounu, updateNounuDto);
    return this.nounuRepository.save(nounu);
  }

  async remove(id: string): Promise<void> {
    const nounu = await this.findOne(id);
    await this.nounuRepository.remove(nounu);
  }
}
