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
exports.NounuController = void 0;
const media_config_1 = require("./../../config/media.config");
const common_1 = require("@nestjs/common");
const nounu_service_1 = require("./nounu.service");
const create_nounu_dto_1 = require("./dto/create-nounu.dto");
const update_nounu_dto_1 = require("./dto/update-nounu.dto");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
let NounuController = class NounuController {
    nounuService;
    constructor(nounuService) {
        this.nounuService = nounuService;
    }
    async create(createNounuDto, files) {
        return this.nounuService.create(createNounuDto, files);
    }
    async findAll() {
        return this.nounuService.findAll();
    }
    async findOne(id) {
        return this.nounuService.findOne(id);
    }
    async update(id, updateNounuDto) {
        return this.nounuService.update(id, updateNounuDto);
    }
    async remove(id) {
        return this.nounuService.remove(id);
    }
};
exports.NounuController = NounuController;
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)({ storage: media_config_1.storage })),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_nounu_dto_1.CreateNounuDto, Array]),
    __metadata("design:returntype", Promise)
], NounuController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NounuController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NounuController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_nounu_dto_1.UpdateNounuDto]),
    __metadata("design:returntype", Promise)
], NounuController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NounuController.prototype, "remove", null);
exports.NounuController = NounuController = __decorate([
    (0, swagger_1.ApiTags)('Nounu'),
    (0, common_1.Controller)('nounu'),
    __metadata("design:paramtypes", [nounu_service_1.NounuService])
], NounuController);
