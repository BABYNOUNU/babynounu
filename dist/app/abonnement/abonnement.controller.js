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
exports.AbonnementController = void 0;
const common_1 = require("@nestjs/common");
const abonnement_service_1 = require("./abonnement.service");
const create_abonnement_dto_1 = require("./dtos/create-abonnement.dto");
const swagger_1 = require("@nestjs/swagger");
let AbonnementController = class AbonnementController {
    abonnementService;
    constructor(abonnementService) {
        this.abonnementService = abonnementService;
    }
    async createAbonnement(createAbonnementDto) {
        return this.abonnementService.createAbonnement(createAbonnementDto);
    }
    async getAbonnementsByUser(userId) {
        return this.abonnementService.getAbonnementsByUser(userId);
    }
    async getAbonnementById(abonnementId) {
        return this.abonnementService.getAbonnementById(abonnementId);
    }
    async hasActiveAbonnement(userId) {
        const hasActiveSubscription = await this.abonnementService.hasActiveAbonnement(userId);
        return { hasActiveSubscription };
    }
};
exports.AbonnementController = AbonnementController;
__decorate([
    (0, common_1.Post)('comfirm'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new subscription' }),
    (0, swagger_1.ApiBody)({ type: create_abonnement_dto_1.CreateAbonnementDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Subscription created successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_abonnement_dto_1.CreateAbonnementDto]),
    __metadata("design:returntype", Promise)
], AbonnementController.prototype, "createAbonnement", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get subscriptions for a user' }),
    (0, swagger_1.ApiParam)({ name: 'userId', type: String, description: 'ID of the user' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Subscriptions retrieved successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AbonnementController.prototype, "getAbonnementsByUser", null);
__decorate([
    (0, common_1.Get)(':abonnementId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a subscription by ID' }),
    (0, swagger_1.ApiParam)({ name: 'abonnementId', type: String, description: 'ID of the subscription' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Subscription retrieved successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Subscription not found' }),
    __param(0, (0, common_1.Param)('abonnementId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AbonnementController.prototype, "getAbonnementById", null);
__decorate([
    (0, common_1.Get)('user/has-active-subscription/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Check if user has an active subscription' }),
    (0, swagger_1.ApiParam)({ name: 'userId', type: String, description: 'ID of the user' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns true if user has an active subscription, otherwise false',
        schema: { example: { hasActiveSubscription: true } },
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AbonnementController.prototype, "hasActiveAbonnement", null);
exports.AbonnementController = AbonnementController = __decorate([
    (0, swagger_1.ApiTags)('abonnements'),
    (0, common_1.Controller)('abonnements'),
    __metadata("design:paramtypes", [abonnement_service_1.AbonnementService])
], AbonnementController);
