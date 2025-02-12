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
const type_parameter_seed_1 = require("../../database/seeders/parameters/type.parameter.seed");
const disponibly_seed_1 = require("../../database/seeders/disponibly.seed");
const typeMedia_seeder_1 = require("../../database/seeders/typeMedia.seeder");
const tasks_seed_1 = require("../../database/seeders/tasks.seed");
const cleaningSupplies_seed_1 = require("../../database/seeders/parameters/cleaningSupplies.seed");
const candidateCriteria_seed_1 = require("../../database/seeders/candidateCriteria.seed");
const typeServices_seed_1 = require("../../database/seeders/typeServices.seed");
let SettingController = class SettingController {
    roles;
    typeParameterRepository;
    parameterRepository;
    settingSubscriptionTypes;
    notificationRepository;
    constructor(roles, typeParameterRepository, parameterRepository, settingSubscriptionTypes, notificationRepository) {
        this.roles = roles;
        this.typeParameterRepository = typeParameterRepository;
        this.parameterRepository = parameterRepository;
        this.settingSubscriptionTypes = settingSubscriptionTypes;
        this.notificationRepository = notificationRepository;
    }
    async VerifyInParameter(Repository, AllParametre) {
        let ToAdd = [];
        for (let index = 0; index < AllParametre.length; index++) {
            const element = AllParametre[index];
            const IsExistDb = await Repository.find({
                where: {
                    name: element.name,
                },
            });
            if (IsExistDb.length === 0 ||
                !IsExistDb.find((db) => db.slug === element.slug))
                ToAdd.push(element);
        }
        console.log(ToAdd);
        return ToAdd;
    }
    async addAllTypeParametres(Repository, AllParametre) {
        return Repository.insert(await this.VerifyInParameter(Repository, AllParametre));
    }
    async addAllParametres(Repository, AllParametre) {
        return Repository.insert(await this.VerifyInParameter(Repository, AllParametre));
    }
    SeederParametreTypes() {
        return this.addAllTypeParametres(this.typeParameterRepository, type_parameter_seed_1.typeParametresSeeders);
    }
    SeederAgeOfChildren() {
        return this.addAllParametres(this.parameterRepository, agesOfChildren_seed_1.default);
    }
    SeederSpecificNeed() {
        return this.addAllParametres(this.parameterRepository, specificNeed_seed_1.default);
    }
    SeederGuardSchedule() {
        return this.addAllParametres(this.parameterRepository, guardSchedule_seed_1.default);
    }
    SeederHousekeeper() {
        return this.addAllParametres(this.parameterRepository, houseKeepers_seed_1.default);
    }
    SeederServiceFrequency() {
        return this.addAllParametres(this.parameterRepository, serviceFrequencies_seed_1.ServiceFrequencieSeeders);
    }
    SeederDesiredTimes() {
        return this.addAllParametres(this.parameterRepository, schedule_seed_1.DesiredTimesSeeders);
    }
    SeederSpecificSkills() {
        return this.addAllParametres(this.parameterRepository, specificSkills_seed_1.SpecificSkillSeeders);
    }
    SeederLanguages() {
        return this.addAllParametres(this.parameterRepository, spokenLanguage_seed_1.SpokenLanguageSeeders);
    }
    SeederLocalization() {
        return this.addAllParametres(this.parameterRepository, localization_seed_1.LocalizationSeeders);
    }
    SeederPaymentTerms() {
        return this.addAllParametres(this.parameterRepository, paymentTerms_seed_1.PaymentTermSeeders);
    }
    SeederCertifications() {
        return this.addAllParametres(this.parameterRepository, certification_seed_1.CertificationSeeders);
    }
    SeederRoles() {
        return this.addAllParametres(this.parameterRepository, role_seed_1.RoleSeeders);
    }
    SeederTypeProfil() {
        return this.addAllParametres(this.parameterRepository, typesProfil_seed_1.TypeProfilSeeders);
    }
    SeederDisponibilityOfPrestataire() {
        return this.addAllParametres(this.parameterRepository, disponibly_seed_1.default);
    }
    SeederTypeMedia() {
        return this.addAllParametres(this.parameterRepository, typeMedia_seeder_1.TypeMediaSeeders);
    }
    SeederCleaningSupplies() {
        return this.addAllParametres(this.parameterRepository, cleaningSupplies_seed_1.CleaningSuppliesSeeders);
    }
    SeederTasks() {
        return this.addAllParametres(this.parameterRepository, tasks_seed_1.TaskSeeders);
    }
    SeederCandidateCriteria() {
        return this.addAllParametres(this.parameterRepository, candidateCriteria_seed_1.default);
    }
    SeederTypeDeServices() {
        return this.addAllParametres(this.parameterRepository, typeServices_seed_1.TypeServiceSeeders);
    }
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
                const userId = row.abonnements_userId;
                const paiementId = row.abonnements_paiementId;
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
                    await this.settingSubscriptionTypes.remove(toRemove);
                    toKeep.updatedAt = new Date();
                    await this.settingSubscriptionTypes.save(toKeep);
                }
            }
        });
    }
    async RemoveDoublonNotifications() {
        return this.notificationRepository
            .createQueryBuilder('notifications')
            .select([
            'COUNT(notifications.id) as count',
            'notifications.user',
            'notifications.type',
            'notifications.job',
        ])
            .groupBy('notifications.user, notifications.type, notifications.job')
            .having('count > 1')
            .getRawMany()
            .then(async (result) => {
            for (const row of result) {
                const userId = row.notifications_user;
                const type = row.notifications_type;
                const jobId = row.notifications_job;
                const notifications = await this.notificationRepository.find({
                    where: {
                        user: { id: userId },
                        type: type,
                        job: { id: jobId },
                    },
                    relations: ['user', 'job', 'sender'],
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
    (0, common_1.Post)('seed/disponibility_of_prestataire'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SettingController.prototype, "SeederDisponibilityOfPrestataire", null);
__decorate([
    (0, common_1.Post)('seed/type_de_medias'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SettingController.prototype, "SeederTypeMedia", null);
__decorate([
    (0, common_1.Post)('seed/cleaning-supplies'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SettingController.prototype, "SeederCleaningSupplies", null);
__decorate([
    (0, common_1.Post)('seed/tasks'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SettingController.prototype, "SeederTasks", null);
__decorate([
    (0, common_1.Post)('seed/candidate-criteria'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SettingController.prototype, "SeederCandidateCriteria", null);
__decorate([
    (0, common_1.Post)('seed/type-de-services'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SettingController.prototype, "SeederTypeDeServices", null);
__decorate([
    (0, common_1.Post)('seed/remove-doublon-abonnements'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "RemoveDoublonAbonnements", null);
__decorate([
    (0, common_1.Post)('seed/remove-doublon-notifications'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "RemoveDoublonNotifications", null);
exports.SettingController = SettingController = __decorate([
    (0, swagger_1.ApiTags)('Setting'),
    (0, common_1.Controller)('setting'),
    __param(0, (0, common_1.Inject)('ROLE_REPOSITORY')),
    __param(1, (0, common_1.Inject)('TYPE_PARAMETER_REPOSITORY')),
    __param(2, (0, common_1.Inject)('PARAMETER_REPOSITORY')),
    __param(3, (0, common_1.Inject)('ABONNEMENT_REPOSITORY')),
    __param(4, (0, common_1.Inject)('NOTIFICATION_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], SettingController);
