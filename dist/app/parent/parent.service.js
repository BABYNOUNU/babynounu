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
exports.ParentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let ParentService = class ParentService {
    parentSettingLanguagesRepository;
    settingLanguagesRepository;
    parentSettingLocalizationsRepository;
    parentSettingAgeOfChildrensRepository;
    parentSettingDesiredTimesRepository;
    parentSettingAreaWorksRepository;
    settingAgeOfChildrensRepository;
    settingLocalizationsRepository;
    settingDesiredTimesRepository;
    settingSpecificSkillsRepository;
    parentSettingSpecificSkillsRepository;
    userRepository;
    parentsRepository;
    parentSettingSpecificNeedsRepository;
    settingSpecificNeedsRepository;
    parentSettingGuardSchedulesRepository;
    settingGuardSchedulesRepository;
    settingServiceFrequencyRepository;
    parentServiceFrequencyRepository;
    constructor(parentSettingLanguagesRepository, settingLanguagesRepository, parentSettingLocalizationsRepository, parentSettingAgeOfChildrensRepository, parentSettingDesiredTimesRepository, parentSettingAreaWorksRepository, settingAgeOfChildrensRepository, settingLocalizationsRepository, settingDesiredTimesRepository, settingSpecificSkillsRepository, parentSettingSpecificSkillsRepository, userRepository, parentsRepository, parentSettingSpecificNeedsRepository, settingSpecificNeedsRepository, parentSettingGuardSchedulesRepository, settingGuardSchedulesRepository, settingServiceFrequencyRepository, parentServiceFrequencyRepository) {
        this.parentSettingLanguagesRepository = parentSettingLanguagesRepository;
        this.settingLanguagesRepository = settingLanguagesRepository;
        this.parentSettingLocalizationsRepository = parentSettingLocalizationsRepository;
        this.parentSettingAgeOfChildrensRepository = parentSettingAgeOfChildrensRepository;
        this.parentSettingDesiredTimesRepository = parentSettingDesiredTimesRepository;
        this.parentSettingAreaWorksRepository = parentSettingAreaWorksRepository;
        this.settingAgeOfChildrensRepository = settingAgeOfChildrensRepository;
        this.settingLocalizationsRepository = settingLocalizationsRepository;
        this.settingDesiredTimesRepository = settingDesiredTimesRepository;
        this.settingSpecificSkillsRepository = settingSpecificSkillsRepository;
        this.parentSettingSpecificSkillsRepository = parentSettingSpecificSkillsRepository;
        this.userRepository = userRepository;
        this.parentsRepository = parentsRepository;
        this.parentSettingSpecificNeedsRepository = parentSettingSpecificNeedsRepository;
        this.settingSpecificNeedsRepository = settingSpecificNeedsRepository;
        this.parentSettingGuardSchedulesRepository = parentSettingGuardSchedulesRepository;
        this.settingGuardSchedulesRepository = settingGuardSchedulesRepository;
        this.settingServiceFrequencyRepository = settingServiceFrequencyRepository;
        this.parentServiceFrequencyRepository = parentServiceFrequencyRepository;
    }
    async Parents() {
        return this.parentsRepository.find();
    }
    async Parent(ParentsWhereUniqueInput) {
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
            throw new common_1.BadRequestException({ message: 'Parent not found' });
        }
        return parent;
    }
    async create(createParentDto, files) {
        if (!files || !files.profil_image?.length) {
            throw new common_1.BadRequestException('At least one image is required');
        }
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
            throw new common_1.BadRequestException({ message: 'Parent not created' });
        }
        await this.userRepository.update({ id: createParentDto.user }, { parent: saveParent });
        async function createRelation(items, repository, relationName) {
            if (!Array.isArray(items) || items.length === 0) {
                return [];
            }
            return Promise.all(items.map(async (item) => {
                const entity = await repository.findOne({ where: { name: item } });
                if (!entity) {
                    throw new Error(`Entity not found for item: ${item}`);
                }
                return {
                    [relationName]: entity,
                    parent: saveParent,
                };
            }));
        }
        const relations = [
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
            {
                items: createParentDto.settingServiceFrequency,
                repository: this.settingServiceFrequencyRepository,
                relationName: 'service',
                targetRepository: this.parentServiceFrequencyRepository,
                targetField: 'settingServiceFrequency',
            },
        ];
        for (const relation of relations) {
            const objects = await createRelation(relation.items, relation.repository, relation.relationName);
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
    async UpdateParent() {
        const newParents = this.parentsRepository.create({});
        return await this.parentsRepository.save(newParents);
    }
    async DeleteParent(where) {
        this.parentsRepository.delete({ id: where });
        return { message: 'Parents deleted' };
    }
};
exports.ParentService = ParentService;
exports.ParentService = ParentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PARENT_SEETING_LANGUAGE_REPOSITORY')),
    __param(1, (0, common_1.Inject)('SEETING_LANGUAGE_REPOSITORY')),
    __param(2, (0, common_1.Inject)('PARENT_SETTING_LOCALIZATION_REPOSITORY')),
    __param(3, (0, common_1.Inject)('PARENT_SETTING_AGE_OF_CHILDRENS_REPOSITORY')),
    __param(4, (0, common_1.Inject)('PARENT_SETTING_DESIREDTIMES_REPOSITORY')),
    __param(5, (0, common_1.Inject)('PARENT_SETTING_AREA_WORK_REPOSITORY')),
    __param(6, (0, common_1.Inject)('SETTING_AGE_OF_CHILDRENS_REPOSITORY')),
    __param(7, (0, common_1.Inject)('SETTING_LOCALIZATION_REPOSITORY')),
    __param(8, (0, common_1.Inject)('SETTING_DESIRED_TIME_REPOSITORY')),
    __param(9, (0, common_1.Inject)('SETTING_SPECIFIC_SKILLS_REPOSITORY')),
    __param(10, (0, common_1.Inject)('PARENT_SETTING_SPECIFIC_SKILLS_REPOSITORY')),
    __param(11, (0, common_1.Inject)('USER_REPOSITORY')),
    __param(12, (0, common_1.Inject)('PARENT_REPOSITORY')),
    __param(13, (0, common_1.Inject)('PARENT_SETTING_SPECIFIC_NEEDS_REPOSITORY')),
    __param(14, (0, common_1.Inject)('SETTING_SPECIFIC_NEEDS_REPOSITORY')),
    __param(15, (0, common_1.Inject)('PARENT_SETTING_GUARD_SCHEDULES_REPOSITORY')),
    __param(16, (0, common_1.Inject)('SETTING_GUARD_SCHEDULE_REPOSITORY')),
    __param(17, (0, common_1.Inject)('SETTING_SERVICE_FREQUENCY_REPOSITORY')),
    __param(18, (0, common_1.Inject)('PARENT_SETTING_SERVICE_FREQUENCY_REPOSITORY')),
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
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], ParentService);
