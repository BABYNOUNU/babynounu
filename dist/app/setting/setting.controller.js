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
exports.SettingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const slug_utils_1 = require("../../utils/slug.utils");
const agesOfChildren_seed_1 = require("../../database/seeders/agesOfChildren.seed");
const specificNeed_seed_1 = require("../../database/seeders/specificNeed.seed");
const guardSchedule_seed_1 = require("../../database/seeders/guardSchedule.seed");
const houseKeepers_seed_1 = require("../../database/seeders/houseKeepers.seed");
const serviceFrequencies_seed_1 = require("../../database/seeders/serviceFrequencies.seed");
const specificSkills_seed_1 = require("../../database/seeders/specificSkills.seed");
const spokenLanguage_seed_1 = require("../../database/seeders/spokenLanguage.seed");
const localization_seed_1 = require("../../database/seeders/localization.seed");
const schedule_seed_1 = require("../../database/seeders/schedule.seed");
const paymentTerms_seed_1 = require("../../database/seeders/paymentTerms.seed");
const certification_seed_1 = require("../../database/seeders/certification.seed");
const role_seed_1 = require("../../database/seeders/role.seed");
const typesProfil_seed_1 = require("../../database/seeders/typesProfil.seed");
const type_seed_1 = require("../../database/seeders/type.seed");
const type_parameter_seed_1 = require("../../database/seeders/parameters/type.parameter.seed");
let SettingController = class SettingController {
    settingAgeOfChildrenRepository;
    settingSpecificNeed;
    settingGuardSchelude;
    settingHousekeeper;
    settingServiceFrequency;
    settingDesiredTime;
    settingSpecificSkills;
    settingLanguages;
    settingLocalization;
    settingPaymentTerms;
    settingCertification;
    roles;
    settingTypeProfil;
    settingTypePaiement;
    typeParameterRepository;
    parameterRepository;
    constructor(settingAgeOfChildrenRepository, settingSpecificNeed, settingGuardSchelude, settingHousekeeper, settingServiceFrequency, settingDesiredTime, settingSpecificSkills, settingLanguages, settingLocalization, settingPaymentTerms, settingCertification, roles, settingTypeProfil, settingTypePaiement, typeParameterRepository, parameterRepository) {
        this.settingAgeOfChildrenRepository = settingAgeOfChildrenRepository;
        this.settingSpecificNeed = settingSpecificNeed;
        this.settingGuardSchelude = settingGuardSchelude;
        this.settingHousekeeper = settingHousekeeper;
        this.settingServiceFrequency = settingServiceFrequency;
        this.settingDesiredTime = settingDesiredTime;
        this.settingSpecificSkills = settingSpecificSkills;
        this.settingLanguages = settingLanguages;
        this.settingLocalization = settingLocalization;
        this.settingPaymentTerms = settingPaymentTerms;
        this.settingCertification = settingCertification;
        this.roles = roles;
        this.settingTypeProfil = settingTypeProfil;
        this.settingTypePaiement = settingTypePaiement;
        this.typeParameterRepository = typeParameterRepository;
        this.parameterRepository = parameterRepository;
    }
    removeDuplicatesByName(array1, array2) {
        const namesInArray2 = new Set(array2.map((item) => item.name));
        const filteredArray1 = array1.filter((item) => !namesInArray2.has(item.name));
        const namesInArray1 = new Set(array1.map((item) => item.name));
        const filteredArray2 = array2.filter((item) => !namesInArray1.has(item.name));
        return [...filteredArray1, ...filteredArray2];
    }
    async createSeeder(Repository, createSeederBody) {
        let settingSave;
        let isNext = 0;
        const IsNameExist = await Repository.find();
        console.log(IsNameExist);
        for (let index = 0; index < this.removeDuplicatesByName(createSeederBody, IsNameExist).length; index++) {
            const Seeder = this.removeDuplicatesByName(createSeederBody, IsNameExist)[index];
            Seeder.slug = await new slug_utils_1.SlugUtils().all(Seeder.name, Repository);
            const newSetting = Repository.create({
                slug: Seeder.slug,
                name: Seeder.name,
                description: Seeder.description,
                type_parameter: Seeder.type_parameter,
            });
            settingSave = await Repository.save(newSetting);
        }
        if (!settingSave) {
            throw new common_1.BadRequestException({ message: 'Setting not created' });
        }
        return {
            setting: {
                ...settingSave,
            },
        };
    }
    SeederParametreTypes() {
        return this.createSeeder(this.typeParameterRepository, type_parameter_seed_1.typeParametresSeeders);
    }
    SeederAgeOfChildren() {
        return this.createSeeder(this.parameterRepository, agesOfChildren_seed_1.default);
    }
    SeederSpecificNeed() {
        return this.createSeeder(this.parameterRepository, specificNeed_seed_1.default);
    }
    SeederGuardSchedule() {
        return this.createSeeder(this.parameterRepository, guardSchedule_seed_1.default);
    }
    SeederHousekeeper() {
        return this.createSeeder(this.parameterRepository, houseKeepers_seed_1.default);
    }
    SeederServiceFrequency() {
        return this.createSeeder(this.parameterRepository, serviceFrequencies_seed_1.ServiceFrequencieSeeders);
    }
    SeederDesiredTimes() {
        return this.createSeeder(this.parameterRepository, schedule_seed_1.DesiredTimesSeeders);
    }
    SeederSpecificSkills() {
        return this.createSeeder(this.parameterRepository, specificSkills_seed_1.SpecificSkillSeeders);
    }
    SeederLanguages() {
        return this.createSeeder(this.parameterRepository, spokenLanguage_seed_1.SpokenLanguageSeeders);
    }
    SeederLocalization() {
        return this.createSeeder(this.parameterRepository, localization_seed_1.LocalizationSeeders);
    }
    SeederPaymentTerms() {
        return this.createSeeder(this.parameterRepository, paymentTerms_seed_1.PaymentTermSeeders);
    }
    SeederCertifications() {
        return this.createSeeder(this.parameterRepository, certification_seed_1.CertificationSeeders);
    }
    SeederRoles() {
        return this.createSeeder(this.roles, role_seed_1.RoleSeeders);
    }
    SeederTypeProfil() {
        return this.createSeeder(this.settingTypeProfil, typesProfil_seed_1.TypeProfilSeeders);
    }
    SeederSettingTypePaiement() {
        return this.createSeeder(this.settingTypePaiement, type_seed_1.TypePaiementSeeders);
    }
};
exports.SettingController = SettingController;
__decorate([
    (0, common_1.Post)('seed/parametres/types'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SettingController.prototype, "SeederParametreTypes", null);
__decorate([
    (0, common_1.Post)('seed/age-of-children'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SettingController.prototype, "SeederAgeOfChildren", null);
__decorate([
    (0, common_1.Post)('seed/specific-need'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SettingController.prototype, "SeederSpecificNeed", null);
__decorate([
    (0, common_1.Post)('seed/guard-schedule'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SettingController.prototype, "SeederGuardSchedule", null);
__decorate([
    (0, common_1.Post)('seed/housekeeper'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SettingController.prototype, "SeederHousekeeper", null);
__decorate([
    (0, common_1.Post)('seed/service-frequency'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SettingController.prototype, "SeederServiceFrequency", null);
__decorate([
    (0, common_1.Post)('seed/desired-times'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SettingController.prototype, "SeederDesiredTimes", null);
__decorate([
    (0, common_1.Post)('seed/specific-skills'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SettingController.prototype, "SeederSpecificSkills", null);
__decorate([
    (0, common_1.Post)('seed/languages'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SettingController.prototype, "SeederLanguages", null);
__decorate([
    (0, common_1.Post)('seed/localization'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SettingController.prototype, "SeederLocalization", null);
__decorate([
    (0, common_1.Post)('seed/payment-terms'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SettingController.prototype, "SeederPaymentTerms", null);
__decorate([
    (0, common_1.Post)('seed/certifications'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SettingController.prototype, "SeederCertifications", null);
__decorate([
    (0, common_1.Post)('seed/roles'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SettingController.prototype, "SeederRoles", null);
__decorate([
    (0, common_1.Post)('seed/type_profil'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SettingController.prototype, "SeederTypeProfil", null);
__decorate([
    (0, common_1.Post)('seed/setting-type'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SettingController.prototype, "SeederSettingTypePaiement", null);
exports.SettingController = SettingController = __decorate([
    (0, swagger_1.ApiTags)('Setting'),
    (0, common_1.Controller)('setting'),
    __param(0, (0, common_1.Inject)('SETTING_AGE_OF_CHILDREN_REPOSITORY')),
    __param(1, (0, common_1.Inject)('SETTING_SPECIFIC_NEED_REPOSITORY')),
    __param(2, (0, common_1.Inject)('SETTING_GUARD_SCHEDULE_REPOSITORY')),
    __param(3, (0, common_1.Inject)('SETTING_HOUSEKEEPER_REPOSITORY')),
    __param(4, (0, common_1.Inject)('SETTING_SERVICE_FREQUENCY_REPOSITORY')),
    __param(5, (0, common_1.Inject)('SETTING_DESIRE_TIMES_REPOSITORY')),
    __param(6, (0, common_1.Inject)('SETTING_SPECIFIC_SKILL_REPOSITORY')),
    __param(7, (0, common_1.Inject)('SETTING_LANGUAGE_REPOSITORY')),
    __param(8, (0, common_1.Inject)('SETTING_LOCALIZATION_REPOSITORY')),
    __param(9, (0, common_1.Inject)('SETTING_PAYMENT_TERMS_REPOSITORY')),
    __param(10, (0, common_1.Inject)('SETTING_CERTIFICATION_REPOSITORY')),
    __param(11, (0, common_1.Inject)('ROLE_REPOSITORY')),
    __param(12, (0, common_1.Inject)('TYPE_PROFIL_REPOSITORY')),
    __param(13, (0, common_1.Inject)('TYPE_PAIEMENT_REPOSITORY')),
    __param(14, (0, common_1.Inject)('TYPE_PARAMETER_REPOSITORY')),
    __param(15, (0, common_1.Inject)('PARAMETER_REPOSITORY')),
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
        typeorm_1.Repository])
], SettingController);
