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
const update_parent_dto_1 = require("./dto/update-parent.dto");
const platform_express_1 = require("@nestjs/platform-express");
const media_config_1 = require("../../config/media.config");
const search_parent_criteria_dto_1 = require("./dto/search-parent-criteria.dto");
let ParentController = class ParentController {
    parentService;
    constructor(parentService) {
        this.parentService = parentService;
    }
    GetParents() {
        console.log('All');
        this.parentService.findAll();
    }
    GetParent(id) {
        return this.parentService.findOne(id);
    }
    async Create(createParentDto, files) {
        return this.parentService.create(createParentDto, files);
    }
    UpdateParent(id, updateParentDto, files) {
        return this.parentService.update(id.toString(), updateParentDto, files);
    }
    DeleteParent(id) {
        this.parentService.remove(id.toString());
    }
    async searchParent(searchCriteria) {
        return this.parentService.search(searchCriteria);
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
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ParentController.prototype, "GetParent", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([{ name: 'imageParent', maxCount: 4 }], {
        storage: media_config_1.storageMedia,
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_parent_dto_1.CreateParentDto, Object]),
    __metadata("design:returntype", Promise)
], ParentController.prototype, "Create", null);
__decorate([
    (0, common_1.Post)('update/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([{ name: 'imageParent', maxCount: 4 }], {
        storage: media_config_1.storageMedia,
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_parent_dto_1.UpdateParentDto, Object]),
    __metadata("design:returntype", void 0)
], ParentController.prototype, "UpdateParent", null);
__decorate([
    (0, common_1.Delete)('/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ParentController.prototype, "DeleteParent", null);
__decorate([
    (0, common_1.Post)('search/parent'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_parent_criteria_dto_1.SearchParentCriteriaDto]),
    __metadata("design:returntype", Promise)
], ParentController.prototype, "searchParent", null);
exports.ParentController = ParentController = __decorate([
    (0, swagger_1.ApiTags)('Parents'),
    (0, common_1.Controller)('parent'),
    __metadata("design:paramtypes", [parent_service_1.ParentsService])
], ParentController);
