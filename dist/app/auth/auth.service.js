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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const slug_utils_1 = require("../../utils/slug.utils");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userRepository, roleRepository, jwtService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.jwtService = jwtService;
    }
    async signUp({ signUpBody }) {
        signUpBody.slug = await new slug_utils_1.SlugUtils().slug(signUpBody.fullname, this.userRepository);
        const user = await this.userRepository.findOne({
            where: { email: signUpBody.email },
        });
        if (user) {
            throw new common_1.BadRequestException('User already exists');
        }
        const isRole = await this.roleRepository.findOne({ where: { id: signUpBody.role?.toLocaleString() } });
        if (!isRole) {
            throw new common_1.BadRequestException('The role enter not exists');
        }
        signUpBody.password = await bcrypt.hash(signUpBody.password, 10);
        const newUser = this.userRepository.create({
            slug: signUpBody.slug,
            email: signUpBody.email,
            password: signUpBody.password,
            role: isRole,
        });
        const userSave = await this.userRepository.save(newUser);
        if (!userSave) {
            throw new common_1.BadRequestException({ message: 'User not created' });
        }
        return {
            user: {
                ...userSave,
                access_token: (await this.authentificate(userSave)).access_token,
            },
        };
    }
    async signIn({ signInBody }) {
        const user = await this.userRepository.findOne({
            where: { email: signInBody.email },
        });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        const isPasswordCorrect = await bcrypt.compare(signInBody.password, user.password);
        if (!isPasswordCorrect) {
            throw new common_1.BadRequestException('Password is incorrect');
        }
        return {
            user: {
                ...user,
                access_token: (await this.authentificate(user)).access_token,
            },
        };
    }
    async authentificate(user) {
        const payload = { email: user.email, id: user.id };
        return {
            access_token: this.jwtService.sign(payload, {
                secret: process.env.JWT_SECRET,
            }),
        };
    }
    async isUserAuthentificateExist(email) {
        const isExist = await this.userRepository.findOne({ where: { email } });
        return isExist;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('USER_REPOSITORY')),
    __param(1, (0, common_1.Inject)('ROLE_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map