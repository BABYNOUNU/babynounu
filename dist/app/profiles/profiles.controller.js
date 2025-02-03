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
exports.ProfilesController = void 0;
const common_1 = require("@nestjs/common");
const profiles_service_1 = require("./profiles.service");
const create_profile_dto_1 = require("./dtos/create-profile.dto");
const update_profile_dto_1 = require("./dtos/update-profile.dto");
const swagger_1 = require("@nestjs/swagger");
let ProfilesController = class ProfilesController {
    profilesService;
    constructor(profilesService) {
        this.profilesService = profilesService;
    }
    async createProfile(createProfileDto, res) {
        const profile = await this.profilesService.createProfile(createProfileDto);
        return res.status(common_1.HttpStatus.CREATED).json(profile);
    }
    async updateProfile(id, updateProfileDto, res) {
        const profile = await this.profilesService.updateProfile(id, updateProfileDto);
        return res.status(common_1.HttpStatus.OK).json(profile);
    }
    async getProfileById(id, res) {
        const profile = await this.profilesService.getProfileById(id);
        return res.status(common_1.HttpStatus.OK).json(profile);
    }
};
exports.ProfilesController = ProfilesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a profile' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'Profile created successfully.' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_profile_dto_1.CreateProfileDto, Object]),
    __metadata("design:returntype", Promise)
], ProfilesController.prototype, "createProfile", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a profile' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Profile updated successfully.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_profile_dto_1.UpdateProfileDto, Object]),
    __metadata("design:returntype", Promise)
], ProfilesController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a profile by ID' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Profile retrieved successfully.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ProfilesController.prototype, "getProfileById", null);
exports.ProfilesController = ProfilesController = __decorate([
    (0, swagger_1.ApiTags)('profiles'),
    (0, common_1.Controller)('profiles'),
    __metadata("design:paramtypes", [profiles_service_1.ProfilesService])
], ProfilesController);
