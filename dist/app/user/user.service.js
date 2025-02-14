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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let UserService = class UserService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async user(slug) {
        const IsUserExist = await this.userRepository.findOne({
            where: { slug },
        });
        if (!IsUserExist) {
            throw new common_1.BadRequestException({ message: 'user not exist in database' });
        }
        return {
            ...IsUserExist
        };
    }
    async users() {
        return this.userRepository.find();
    }
    async createUser(data) {
        const newUser = this.userRepository.create({
            email: data.email,
        });
        return await this.userRepository.save(newUser);
    }
    async updateUser(data) {
        const newUser = this.userRepository.create({
            email: data.email,
        });
        return await this.userRepository.save(newUser);
    }
    async deleteUser(where) {
        this.userRepository.delete({ id: where });
        return { message: 'User deleted' };
    }
    async loggedUser(ID) {
        const User = await this.userRepository.findOne({ where: { id: ID }, relations: ['role', 'medias.type_media', 'type_profil', 'parent', 'nounu', 'nounu.preferences.adress', 'parent.preferences.adress', 'abonnement'] });
        console.log(User);
        if (!User) {
            throw new common_1.BadRequestException({ message: 'user not exist in database' });
        }
        const dataUser = await this.ReturnN([User], ['adress'], User.type_profil?.slug);
        return dataUser[0];
    }
    async ReturnN(datas, preferenceKey, type_profil) {
        return datas.map((data) => {
            const aggregatedPreferences = {};
            preferenceKey.forEach((key) => {
                aggregatedPreferences[key] = [];
            });
            data[type_profil][0]?.preferences?.forEach((pref) => {
                preferenceKey.forEach((key) => {
                    if (pref[key])
                        aggregatedPreferences[key].push(pref[key]);
                });
            });
            data[type_profil][0].preferences = aggregatedPreferences;
            const profil = data.nounu.length > 0 ? data.nounu[0] : data.parent[0];
            profil.image = data.medias.find((media) => media.type_media?.slug === 'image-profil');
            return {
                ...data,
                profil,
                image: data.medias.find((media) => media.type_media?.slug === 'image-profil')
            };
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('USER_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UserService);
