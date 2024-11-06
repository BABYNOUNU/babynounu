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
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let RoleService = class RoleService {
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }
    async role(roleWhereUniqueInput) {
        return this.roleRepository.findOne({
            where: roleWhereUniqueInput,
        });
    }
    async roles() {
        return this.roleRepository.find();
    }
    async createRole(data) {
        const newRoles = this.roleRepository.create({
            slug: data.slug,
            name: data.name,
        });
        return await this.roleRepository.save(newRoles);
    }
    async updateRole(data) {
        const newRoles = this.roleRepository.create({
            name: data.name,
        });
        return await this.roleRepository.save(newRoles);
    }
    async deleteRole(where) {
        this.roleRepository.delete({ id: where });
        return { message: 'Roles deleted' };
    }
};
exports.RoleService = RoleService;
exports.RoleService = RoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ROLE_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], RoleService);
//# sourceMappingURL=role.service.js.map