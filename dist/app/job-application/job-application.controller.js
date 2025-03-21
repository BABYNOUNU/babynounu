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
exports.JobApplicationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const job_application_service_1 = require("./job-application.service");
const create_job_application_dto_1 = require("./dto/create-job-application.dto");
const update_job_application_dto_1 = require("./dto/update-job-application.dto");
const job_application_model_1 = require("./models/job-application.model");
const auh_guard_1 = require("../auth/auh.guard");
let JobApplicationController = class JobApplicationController {
    jobApplicationService;
    constructor(jobApplicationService) {
        this.jobApplicationService = jobApplicationService;
    }
    create(createJobApplicationDto, req) {
        return this.jobApplicationService.create(createJobApplicationDto, req.user.id);
    }
    findAll() {
        return this.jobApplicationService.findAll();
    }
    findOne(id) {
        return this.jobApplicationService.findOne(+id);
    }
    update(id, updateJobApplicationDto) {
        return this.jobApplicationService.update(+id, updateJobApplicationDto);
    }
    remove(id) {
        return this.jobApplicationService.remove(+id);
    }
    getJobApplyByUser(userId) {
        return this.jobApplicationService.getJobApplyByUser(userId);
    }
    getJobToApplyByUser(userId) {
        return this.jobApplicationService.getJobToApplyByUser(userId);
    }
};
exports.JobApplicationController = JobApplicationController;
__decorate([
    (0, common_1.UseGuards)(auh_guard_1.JwtAuthGuard),
    (0, common_1.Post)('create'),
    (0, swagger_1.ApiOperation)({ summary: 'Créer une nouvelle candidature' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Candidature créée avec succès.', type: job_application_model_1.JobApplication }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_job_application_dto_1.CreateJobApplicationDto, Object]),
    __metadata("design:returntype", void 0)
], JobApplicationController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer toutes les candidatures' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des candidatures.', type: [job_application_model_1.JobApplication] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], JobApplicationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer une candidature par ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la candidature', example: '1' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Détails de la candidature.', type: job_application_model_1.JobApplication }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Candidature non trouvée.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], JobApplicationController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour une candidature' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la candidature', example: '1' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Candidature mise à jour.', type: job_application_model_1.JobApplication }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Candidature non trouvée.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_job_application_dto_1.UpdateJobApplicationDto]),
    __metadata("design:returntype", void 0)
], JobApplicationController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer une candidature' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la candidature', example: '1' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Candidature supprimée.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Candidature non trouvée.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], JobApplicationController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer les candidatures d\'un utilisateur par ID' }),
    (0, swagger_1.ApiParam)({ name: 'userId', description: 'ID de l\'utilisateur', example: '1' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des candidatures de l\'utilisateur.', type: [job_application_model_1.JobApplication] }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Utilisateur non trouvé ou aucune candidature.' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], JobApplicationController.prototype, "getJobApplyByUser", null);
__decorate([
    (0, common_1.Get)('job/user/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer les jobs ou l\'utilisateur peut postuler' }),
    (0, swagger_1.ApiParam)({ name: 'userId', description: 'ID de l\'utilisateur', example: '1' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des jobs où l\'utilisateur peut postuler.', type: [job_application_model_1.JobApplication] }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Utilisateur non trouvé ou aucun job.' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], JobApplicationController.prototype, "getJobToApplyByUser", null);
exports.JobApplicationController = JobApplicationController = __decorate([
    (0, swagger_1.ApiTags)('Job Applications'),
    (0, common_1.Controller)('job-applications'),
    __metadata("design:paramtypes", [job_application_service_1.JobApplicationsService])
], JobApplicationController);
