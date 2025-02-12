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
exports.NounusController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const nounus_service_1 = require("./nounus.service");
const create_nounu_dto_1 = require("./dtos/create-nounu.dto");
const update_nounu_dto_1 = require("./dtos/update-nounu.dto");
const nounu_model_1 = require("./models/nounu.model");
const platform_express_1 = require("@nestjs/platform-express");
const media_config_1 = require("../../config/media.config");
let NounusController = class NounusController {
    nounuService;
    constructor(nounuService) {
        this.nounuService = nounuService;
    }
    async create(createNounuDto, files) {
        return await this.nounuService.create(createNounuDto, files);
    }
    async findAll() {
        return await this.nounuService.findAll();
    }
    async findOne(id) {
        return await this.nounuService.findOne(id);
    }
    async update(id, updateNounuDto) {
        return await this.nounuService.update(id, updateNounuDto);
    }
    async remove(id) {
        return await this.nounuService.remove(id);
    }
};
exports.NounusController = NounusController;
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'imageNounu', maxCount: 1 },
        { name: 'documents', maxCount: 4 },
        { name: 'gallery', maxCount: 20 },
    ], {
        storage: media_config_1.storageMedia
    })),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new Nounus' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Nounus created successfully', type: nounu_model_1.Nounus }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_nounu_dto_1.CreateNounuDto, Object]),
    __metadata("design:returntype", Promise)
], NounusController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all Nounus' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of Nounus', type: [nounu_model_1.Nounus] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NounusController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a Nounus by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Nounus ID', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Nounus found', type: nounu_model_1.Nounus }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Nounus not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NounusController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a Nounus by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Nounus ID', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Nounus updated successfully', type: nounu_model_1.Nounus }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Nounus not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_nounu_dto_1.UpdateNounuDto]),
    __metadata("design:returntype", Promise)
], NounusController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a Nounus by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Nounus ID', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Nounus deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Nounus not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NounusController.prototype, "remove", null);
exports.NounusController = NounusController = __decorate([
    (0, swagger_1.ApiTags)('nounu'),
    (0, common_1.Controller)('nounu'),
    __metadata("design:paramtypes", [nounus_service_1.NounusService])
], NounusController);
