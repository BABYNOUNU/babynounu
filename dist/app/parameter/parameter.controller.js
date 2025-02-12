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
exports.ParameterController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const parameter_service_1 = require("./parameter.service");
const parameter_dto_1 = require("./dto/parameter.dto");
let ParameterController = class ParameterController {
    parameterService;
    constructor(parameterService) {
        this.parameterService = parameterService;
    }
    async index(res) {
        try {
            const parameters = await this.parameterService.findAll();
            return res.send({ parameter: parameters });
        }
        catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'Server error' });
        }
    }
    async indexQuery(typeParametre, res) {
        try {
            const parameters = await this.parameterService.findByType(typeParametre);
            return res.send({ parameter: parameters });
        }
        catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'Server error' });
        }
    }
    async findAllBySlug(typeParmaSlug, res) {
        try {
            const parameters = await this.parameterService.findAllBySlug(typeParmaSlug);
            return res.send({ parameter: parameters });
        }
        catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'Server error' });
        }
    }
    async findOneBySlug(typeParmaSlug, res) {
        try {
            const parameter = await this.parameterService.findOneBySlug(typeParmaSlug);
            return res.send({ parameter });
        }
        catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'Server error' });
        }
    }
    async create(createParameterDto, res) {
        try {
            const newParameter = await this.parameterService.create(createParameterDto);
            return res.status(201).send({ parameter: newParameter });
        }
        catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'Server error' });
        }
    }
    async update(id, updateParameterDto, res) {
        try {
            const updatedParameter = await this.parameterService.update(id, updateParameterDto);
            return res.send({ parameter: updatedParameter });
        }
        catch (error) {
            console.error(error);
            return res.status(404).send({ message: 'Paramètre non trouvé' });
        }
    }
    async delete(id, res) {
        try {
            await this.parameterService.remove(id);
            return res.send({ message: 'Paramètre supprimé avec succès' });
        }
        catch (error) {
            console.error(error);
            return res.status(404).send({ message: 'Paramètre non trouvé' });
        }
    }
};
exports.ParameterController = ParameterController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtenir tous les paramètres' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des paramètres.' }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ParameterController.prototype, "index", null);
__decorate([
    (0, common_1.Get)('query'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtenir les paramètres par type' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Liste des paramètres filtrés par type.',
    }),
    __param(0, (0, common_1.Query)('type_parametre')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ParameterController.prototype, "indexQuery", null);
__decorate([
    (0, common_1.Get)('slug/:slug'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtenir les paramètres par slug' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Liste des paramètres filtrés par slug.',
    }),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ParameterController.prototype, "findAllBySlug", null);
__decorate([
    (0, common_1.Get)('slug/one/:slug'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtenir un paramètre par slug' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Paramètre filtré par slug.',
    }),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ParameterController.prototype, "findOneBySlug", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer un nouveau paramètre' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Paramètre créé avec succès.' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [parameter_dto_1.CreateParameterDto, Object]),
    __metadata("design:returntype", Promise)
], ParameterController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour un paramètre' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Paramètre mis à jour.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, parameter_dto_1.CreateParameterDto, Object]),
    __metadata("design:returntype", Promise)
], ParameterController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer un paramètre' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Paramètre supprimé.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ParameterController.prototype, "delete", null);
exports.ParameterController = ParameterController = __decorate([
    (0, swagger_1.ApiTags)('Parameters'),
    (0, common_1.Controller)('parameters'),
    __metadata("design:paramtypes", [parameter_service_1.ParameterService])
], ParameterController);
