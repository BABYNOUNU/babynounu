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
const slug_utils_1 = require("../../utils/slug.utils");
const general_service_1 = require("../setting/_partiels/general.service");
let RoleService = class RoleService extends general_service_1.SettingGeneraleService {
    roleRepository;
    constructor(roleRepository) {
        super();
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
    async createRole(createRoleBody) {
        const IsNameExist = await this.roleRepository.findOne({
            where: { name: createRoleBody.name },
        });
        if (IsNameExist) {
            throw new common_1.BadRequestException({ message: 'Role name already exist' });
        }
        createRoleBody.slug = await new slug_utils_1.SlugUtils().all(createRoleBody.name, this.roleRepository);
        const newRole = this.roleRepository.create({
            slug: createRoleBody.slug,
            name: createRoleBody.name,
            description: createRoleBody.description,
        });
        const roleSave = await this.roleRepository.save(newRole);
        if (!roleSave) {
            throw new common_1.BadRequestException({ message: 'Setting not created' });
        }
        return {
            ...roleSave,
        };
    }
    async updateRole(updateRoleBody, { slug }) {
        await this.Verify_slug(this.roleRepository, { slug });
        const updateRole = await this.roleRepository.update({ slug }, {
            name: updateRoleBody.name,
            description: updateRoleBody.description,
        });
        if (!updateRole.affected) {
            throw new common_1.BadRequestException({ message: 'Setting not updated' });
        }
        return {
            ...(await this.roleRepository.findOne({ where: { slug: slug } })),
        };
    }
    async deleteRole({ slug }) {
        await this.Verify_slug(this.roleRepository, { slug });
        const deleteRole = await this.roleRepository.delete({ slug });
        if (!deleteRole.affected) {
            throw new common_1.BadRequestException({ message: 'Role not deleted' });
        }
        return {
            setting: {
                slug,
                message: 'Role deleted',
            },
        };
    }
};
exports.RoleService = RoleService;
exports.RoleService = RoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ROLE_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], RoleService);
