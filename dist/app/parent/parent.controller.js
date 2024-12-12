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
exports.ParentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const parent_service_1 = require("./parent.service");
const create_parent_dto_1 = require("./dto/create-parent.dto");
const platform_express_1 = require("@nestjs/platform-express");
const media_config_1 = require("./../../config/media.config");
let ParentController = class ParentController {
    parentService;
    constructor(parentService) {
        this.parentService = parentService;
    }
    GetParents() {
        this.parentService.Parents();
    }
    GetParent(id) {
        return this.parentService.Parent(id);
    }
    async Create(createParentDto, files) {
        return this.parentService.create(createParentDto, files);
    }
    UpdateParent() {
        this.parentService.UpdateParent();
    }
    DeleteParent(id) {
        this.parentService.DeleteParent(id);
    }
};
exports.ParentController = ParentController;
__decorate([
    (0, common_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ParentController.prototype, "GetParents", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ParentController.prototype, "GetParent", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'profil_image', maxCount: 1 },
    ], { storage: media_config_1.storage, limits: { fileSize: 10 * 1024 * 1024 }, })),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_parent_dto_1.CreateParentDto, Object]),
    __metadata("design:returntype", Promise)
], ParentController.prototype, "Create", null);
__decorate([
    (0, common_1.Patch)('update/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ParentController.prototype, "UpdateParent", null);
__decorate([
    (0, common_1.Delete)('/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ParentController.prototype, "DeleteParent", null);
exports.ParentController = ParentController = __decorate([
    (0, swagger_1.ApiTags)('Parents'),
    (0, common_1.Controller)('parent'),
    __metadata("design:paramtypes", [parent_service_1.ParentService])
], ParentController);
