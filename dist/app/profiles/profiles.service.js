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
exports.ProfilesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let ProfilesService = class ProfilesService {
    profileRepository;
    userRepository;
    parameterRepository;
    preferenceRepository;
    constructor(profileRepository, userRepository, parameterRepository, preferenceRepository) {
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
        this.parameterRepository = parameterRepository;
        this.preferenceRepository = preferenceRepository;
    }
    async createProfile(createProfileDto) {
        const { firstName, lastName, bio, level, userId, typeId, preferenceId } = createProfileDto;
        const user = await this.userRepository.findOne({ where: { id: userId.toString() } });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found`);
        }
        const parameter = await this.parameterRepository.findOne({ where: { id: typeId } });
        if (!parameter) {
            throw new common_1.NotFoundException(`TypeParameter with ID ${typeId} not found`);
        }
        const preference = await this.preferenceRepository.findOne({ where: { id: preferenceId } });
        if (!preference) {
            throw new common_1.NotFoundException(`Preference with ID ${preferenceId} not found`);
        }
        const profile = this.profileRepository.create({
            firstName,
            lastName,
            bio,
            level,
            user: {
                preference: {
                    localization: [{ id: preferenceId }]
                }
            },
            type: parameter
        });
        return this.profileRepository.save(profile);
    }
    async updateProfile(id, updateProfileDto) {
        const profile = await this.profileRepository.findOne({ where: { id } });
        if (!profile) {
            throw new common_1.NotFoundException(`Profile with ID ${id} not found`);
        }
        if (updateProfileDto.typeParameterId) {
            const parameter = await this.parameterRepository.findOne({
                where: { id: updateProfileDto.typeParameterId },
            });
            if (!parameter) {
                throw new common_1.NotFoundException(`TypeParameter with ID ${updateProfileDto.typeParameterId} not found`);
            }
            profile.type = parameter;
        }
        if (updateProfileDto.preferenceId) {
            const preference = await this.preferenceRepository.findOne({
                where: { id: updateProfileDto.preferenceId },
            });
            if (!preference) {
                throw new common_1.NotFoundException(`Preference with ID ${updateProfileDto.preferenceId} not found`);
            }
            profile.user.preference = preference;
        }
        Object.assign(profile, updateProfileDto);
        return this.profileRepository.save(profile);
    }
    async getProfileById(id) {
        const profile = await this.profileRepository.findOne({
            where: { id },
            relations: ['user', 'typeParameter', 'preference'],
        });
        if (!profile) {
            throw new common_1.NotFoundException(`Profile with ID ${id} not found`);
        }
        return profile;
    }
};
exports.ProfilesService = ProfilesService;
exports.ProfilesService = ProfilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PROFILE_REPOSITORY')),
    __param(1, (0, common_1.Inject)('USER_REPOSITORY')),
    __param(2, (0, common_1.Inject)('PARAMETER_REPOSITORY')),
    __param(3, (0, common_1.Inject)('PREFERENCE_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], ProfilesService);
