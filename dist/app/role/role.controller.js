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
exports.RoleController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const role_service_1 = require("./role.service");
const role_dto_1 = require("./dto/role.dto");
let RoleController = class RoleController {
    roleService;
    constructor(roleService) {
        this.roleService = roleService;
    }
    GetRoles() {
        return this.roleService.roles();
    }
    GetRole(slug) {
        return this.roleService.role({
            slug: Number(slug),
        });
    }
    CreateRole(roleBody) {
        return this.roleService.createRole(roleBody);
    }
    UpdateRole(roleBody, slug) {
        return this.roleService.updateRole(roleBody, { slug });
    }
    DeleteRole(slug) {
        return this.roleService.deleteRole({ slug });
    }
};
exports.RoleController = RoleController;
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The record has been successfully created.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "GetRoles", null);
__decorate([
    (0, common_1.Get)('/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "GetRole", null);
__decorate([
    (0, common_1.Post)('/create'),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The record has been successfully created.',
    }),
    (0, swagger_1.ApiBody)({
        type: role_dto_1.RoleDto,
        description: 'Json structure for register object',
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true
    })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_dto_1.RoleDto]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "CreateRole", null);
__decorate([
    (0, common_1.Patch)('/update/:slug'),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The record has been successfully created.',
    }),
    (0, swagger_1.ApiBody)({
        type: role_dto_1.RoleDto,
        description: 'Json structure for register object',
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_dto_1.RoleDto, String]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "UpdateRole", null);
__decorate([
    (0, common_1.Delete)('/delete/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "DeleteRole", null);
exports.RoleController = RoleController = __decorate([
    (0, swagger_1.ApiTags)('Roles'),
    (0, common_1.Controller)('role'),
    __metadata("design:paramtypes", [role_service_1.RoleService])
], RoleController);
