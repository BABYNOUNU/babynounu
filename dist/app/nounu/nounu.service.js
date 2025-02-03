"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NounuService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const media_service_1 = require("../media/media.service");
let NounuService = class NounuService extends media_service_1.MediaService {
    nounuRepository;
    nounuSettingsRepository;
    nounuSettingLanguagesRepository;
    settingLanguagesRepository;
    nounuSettingLocalizationsRepository;
    nounuSettingAgeOfChildrensRepository;
    nounuSettingCertificationsRepository;
    nounuSettingDesiredTimesRepository;
    nounuSettingAreaWorksRepository;
    settingAgeOfChildrensRepository;
    settingLocalizationsRepository;
    settingDesiredTimesRepository;
    settingCertificationsRepository;
    settingSpecificSkillsRepository;
    nounuSettingSpecificSkillsRepository;
    userRepository;
    mediaRepository;
    constructor(nounuRepository, nounuSettingsRepository, nounuSettingLanguagesRepository, settingLanguagesRepository, nounuSettingLocalizationsRepository, nounuSettingAgeOfChildrensRepository, nounuSettingCertificationsRepository, nounuSettingDesiredTimesRepository, nounuSettingAreaWorksRepository, settingAgeOfChildrensRepository, settingLocalizationsRepository, settingDesiredTimesRepository, settingCertificationsRepository, settingSpecificSkillsRepository, nounuSettingSpecificSkillsRepository, userRepository, mediaRepository) {
        super();
        this.nounuRepository = nounuRepository;
        this.nounuSettingsRepository = nounuSettingsRepository;
        this.nounuSettingLanguagesRepository = nounuSettingLanguagesRepository;
        this.settingLanguagesRepository = settingLanguagesRepository;
        this.nounuSettingLocalizationsRepository = nounuSettingLocalizationsRepository;
        this.nounuSettingAgeOfChildrensRepository = nounuSettingAgeOfChildrensRepository;
        this.nounuSettingCertificationsRepository = nounuSettingCertificationsRepository;
        this.nounuSettingDesiredTimesRepository = nounuSettingDesiredTimesRepository;
        this.nounuSettingAreaWorksRepository = nounuSettingAreaWorksRepository;
        this.settingAgeOfChildrensRepository = settingAgeOfChildrensRepository;
        this.settingLocalizationsRepository = settingLocalizationsRepository;
        this.settingDesiredTimesRepository = settingDesiredTimesRepository;
        this.settingCertificationsRepository = settingCertificationsRepository;
        this.settingSpecificSkillsRepository = settingSpecificSkillsRepository;
        this.nounuSettingSpecificSkillsRepository = nounuSettingSpecificSkillsRepository;
        this.userRepository = userRepository;
        this.mediaRepository = mediaRepository;
    }
    async create(createNounuDto, files) {
        if (!files) {
            throw new common_1.BadRequestException('At least one image is required');
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
            throw new common_1.BadRequestException({ message: 'Nounu not created' });
        }
        for (const file of files.gallery) {
            const imagePath = `/uploads/${file.filename}`;
            this.createMedia({
                url: imagePath,
                media_nounu: saveNounu,
            }, this.mediaRepository);
        }
        async function createRelation(items, repository, relationName) {
            if (!Array.isArray(items) || items.length === 0) {
                throw new Error(`Invalid items: ${items}`);
            }
            const relationObjects = await Promise.all(items.map(async (item) => {
                item = JSON.parse(item);
                const entity = await repository.findOne({
                    where: { name: item.name },
                });
                if (!entity) {
                    throw new Error(`Entity not found for item: ${item}`);
                }
                return {
                    [relationName]: entity,
                    nounu: saveNounu,
                };
            }));
            return relationObjects;
        }
        const langObjects = await createRelation(createNounuDto.settingLanguages, this.settingLanguagesRepository, 'language');
        const langEntities = this.nounuSettingLanguagesRepository.create(langObjects);
        saveNounu.settingLanguages =
            await this.nounuSettingLanguagesRepository.save(langEntities);
        const AgeObjects = await createRelation(createNounuDto.settingAgeOfChildrens, this.settingAgeOfChildrensRepository, 'AgeOfChildrens');
        const AgeEntities = this.nounuSettingAgeOfChildrensRepository.create(AgeObjects);
        saveNounu.settingAgeOfChildrens =
            await this.nounuSettingAgeOfChildrensRepository.save(AgeEntities);
        const certObjects = await createRelation(createNounuDto.settingCertifications, this.settingCertificationsRepository, 'certification');
        const certEntities = this.nounuSettingCertificationsRepository.create(certObjects);
        saveNounu.settingCertifications =
            await this.nounuSettingCertificationsRepository.save(certEntities);
        const timeObjects = await createRelation(createNounuDto.settingDesiredTimes, this.settingDesiredTimesRepository, 'time');
        const timeEntities = this.nounuSettingDesiredTimesRepository.create(timeObjects);
        saveNounu.settingDesiredTimes =
            await this.nounuSettingDesiredTimesRepository.save(timeEntities);
        const areaObjects = await createRelation(createNounuDto.settingAreaWorks, this.settingLocalizationsRepository, 'area');
        const areaEntities = this.nounuSettingAreaWorksRepository.create(areaObjects);
        saveNounu.settingAreaWorks =
            await this.nounuSettingAreaWorksRepository.save(areaEntities);
        const skillObjects = await createRelation(createNounuDto.settingSpecificSkills, this.settingSpecificSkillsRepository, 'skill');
        const skillEntities = this.nounuSettingSpecificSkillsRepository.create(skillObjects);
        saveNounu.settingSpecificSkills =
            await this.nounuSettingSpecificSkillsRepository.save(skillEntities);
        const GetProfilNounu = await this.nounuRepository.findOne({
            where: { id: saveNounu.id },
            relations: ['user'],
        });
        return GetProfilNounu;
    }
    async findAll(userId) {
        return this.nounuRepository.find({
            where: {
                user: {
                    email: (0, typeorm_1.Not)(userId),
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
    async findOne(id) {
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
            throw new common_2.NotFoundException(`Nounu with ID ${id} not found`);
        }
        return nounu;
    }
    async update(id, updateNounuDto) {
        const nounu = await this.findOne(id);
        Object.assign(nounu, updateNounuDto);
        return this.nounuRepository.save(nounu);
    }
    async remove(id) {
        const nounu = await this.findOne(id);
        await this.nounuRepository.remove(nounu);
    }
};
exports.NounuService = NounuService;
exports.NounuService = NounuService = __decorate([
    (0, common_2.Injectable)(),
    __param(0, (0, common_1.Inject)('NOUNU_REPOSITORY')),
    __param(1, (0, common_1.Inject)('NOUNU_SETTING_REPOSITORY')),
    __param(2, (0, common_1.Inject)('NOUNU_SEETING_LANGUAGE_REPOSITORY')),
    __param(3, (0, common_1.Inject)('SEETING_LANGUAGE_REPOSITORY')),
    __param(4, (0, common_1.Inject)('NOUNU_SETTING_LOCALIZATION_REPOSITORY')),
    __param(5, (0, common_1.Inject)('NOUNU_SETTING_AGE_OF_CHILDRENS_REPOSITORY')),
    __param(6, (0, common_1.Inject)('NOUNU_SETTING_CERTIFICATION_REPOSITORY')),
    __param(7, (0, common_1.Inject)('NOUNU_SETTING_DESIREDTIMES_REPOSITORY')),
    __param(8, (0, common_1.Inject)('NOUNU_SETTING_AREA_WORK_REPOSITORY')),
    __param(9, (0, common_1.Inject)('SETTING_AGE_OF_CHILDRENS_REPOSITORY')),
    __param(10, (0, common_1.Inject)('SETTING_LOCALIZATION_REPOSITORY')),
    __param(11, (0, common_1.Inject)('SETTING_DESIRED_TIME_REPOSITORY')),
    __param(12, (0, common_1.Inject)('SETTING_CERTIFICATION_REPOSITORY')),
    __param(13, (0, common_1.Inject)('SETTING_SPECIFIC_SKILLS_REPOSITORY')),
    __param(14, (0, common_1.Inject)('NOUNU_SETTING_SPECIFIC_SKILLS_REPOSITORY')),
    __param(15, (0, common_1.Inject)('USER_REPOSITORY')),
    __param(16, (0, common_1.Inject)('MEDIA_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], NounuService);
