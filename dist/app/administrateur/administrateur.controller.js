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
exports.AdministrateurController = void 0;
const administrateur_service_1 = require("./administrateur.service");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
class CreateUpdateAppDto {
    appName;
    version;
    description;
    isActive;
    settings;
}
class UpdateUpdateAppDto {
    appName;
    version;
    description;
    isActive;
    settings;
}
class ToggleActiveDto {
    isActive;
}
let AdministrateurController = class AdministrateurController {
    administrateurService;
    constructor(administrateurService) {
        this.administrateurService = administrateurService;
    }
    async create(createUpdateAppDto) {
        return await this.administrateurService.create(createUpdateAppDto);
    }
    async findAll(page, limit) {
        return await this.administrateurService.findAll(page, limit);
    }
    async findActive() {
        return await this.administrateurService.findActive();
    }
    async searchByAppName(appName, page, limit) {
        return await this.administrateurService.searchByAppName(appName, page, limit);
    }
    async checkUpdate(version) {
        return await this.administrateurService.findVersionToActive(version);
    }
    async findOne(id) {
        return await this.administrateurService.findOne(id);
    }
    async update(id, updateUpdateAppDto) {
        return await this.administrateurService.update(id, updateUpdateAppDto);
    }
    async toggleActive(id, toggleActiveDto) {
        return await this.administrateurService.toggleActive(id, toggleActiveDto.isActive);
    }
    async remove(id) {
        return await this.administrateurService.remove(id);
    }
};
exports.AdministrateurController = AdministrateurController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer une nouvelle configuration d\'application' }),
    (0, swagger_1.ApiBody)({ type: CreateUpdateAppDto }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Configuration créée avec succès'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Données invalides'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUpdateAppDto]),
    __metadata("design:returntype", Promise)
], AdministrateurController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer toutes les configurations avec pagination' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Numéro de page (défaut: 1)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Nombre d\'éléments par page (défaut: 10)' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Liste des configurations récupérée avec succès'
    }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], AdministrateurController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('active'),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer la configuration active' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Configuration active récupérée avec succès'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Aucune configuration active trouvée'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdministrateurController.prototype, "findActive", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({ summary: 'Rechercher des configurations par nom d\'application' }),
    (0, swagger_1.ApiQuery)({ name: 'appName', required: true, type: String, description: 'Nom de l\'application à rechercher' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Numéro de page (défaut: 1)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Nombre d\'éléments par page (défaut: 10)' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Résultats de recherche récupérés avec succès'
    }),
    __param(0, (0, common_1.Query)('appName')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], AdministrateurController.prototype, "searchByAppName", null);
__decorate([
    (0, common_1.Get)('check-update'),
    (0, swagger_1.ApiOperation)({ summary: 'Vérifier et activer une version spécifique' }),
    (0, swagger_1.ApiQuery)({ name: 'version', required: true, type: String, description: 'Version à rechercher et activer' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Version activée avec succès'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Version introuvable'
    }),
    __param(0, (0, common_1.Query)('version')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdministrateurController.prototype, "checkUpdate", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer une configuration par son ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID de la configuration' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Configuration récupérée avec succès'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Configuration introuvable'
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdministrateurController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour une configuration' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID de la configuration' }),
    (0, swagger_1.ApiBody)({ type: UpdateUpdateAppDto }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Configuration mise à jour avec succès'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Configuration introuvable'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Données invalides'
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateUpdateAppDto]),
    __metadata("design:returntype", Promise)
], AdministrateurController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(':id/toggle-active'),
    (0, swagger_1.ApiOperation)({ summary: 'Activer/Désactiver une configuration' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID de la configuration' }),
    (0, swagger_1.ApiBody)({ type: ToggleActiveDto }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Statut de la configuration modifié avec succès'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Configuration introuvable'
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, ToggleActiveDto]),
    __metadata("design:returntype", Promise)
], AdministrateurController.prototype, "toggleActive", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer une configuration' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID de la configuration' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Configuration supprimée avec succès'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Configuration introuvable'
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdministrateurController.prototype, "remove", null);
exports.AdministrateurController = AdministrateurController = __decorate([
    (0, swagger_1.ApiTags)('Administrateur'),
    (0, common_1.Controller)('administrateur'),
    __metadata("design:paramtypes", [administrateur_service_1.AdministrateurService])
], AdministrateurController);
