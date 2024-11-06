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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nounus = void 0;
const media_model_1 = require("../../media/models/media.model");
const user_model_1 = require("../../user/user.model");
const typeorm_1 = require("typeorm");
const nounu_setting_model_1 = require("./nounu_setting.model");
let Nounus = class Nounus {
    id;
    fullname;
    media;
    old;
    phone;
    adresse;
    year_experience;
    hourly_rate;
    monthly_rate;
    pricing_flexibility;
    confirmed_verification;
    setting;
    user;
    createdAt;
    updatedAt;
    deletedAt;
};
exports.Nounus = Nounus;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Nounus.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, unique: false, nullable: true }),
    __metadata("design:type", String)
], Nounus.prototype, "fullname", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => media_model_1.Medias, (media) => media.media_nounu, { cascade: true }),
    __metadata("design:type", Array)
], Nounus.prototype, "media", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, unique: false, nullable: false }),
    __metadata("design:type", String)
], Nounus.prototype, "old", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, unique: false, nullable: false }),
    __metadata("design:type", String)
], Nounus.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, unique: false, nullable: false }),
    __metadata("design:type", String)
], Nounus.prototype, "adresse", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, unique: false, nullable: false }),
    __metadata("design:type", String)
], Nounus.prototype, "year_experience", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, unique: false, nullable: true }),
    __metadata("design:type", String)
], Nounus.prototype, "hourly_rate", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, unique: false, nullable: true }),
    __metadata("design:type", String)
], Nounus.prototype, "monthly_rate", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false, unique: false, nullable: true }),
    __metadata("design:type", Boolean)
], Nounus.prototype, "pricing_flexibility", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false, unique: false, nullable: true }),
    __metadata("design:type", Boolean)
], Nounus.prototype, "confirmed_verification", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => nounu_setting_model_1.NounuSettings, (ST) => ST.nounu, { cascade: true }),
    __metadata("design:type", Array)
], Nounus.prototype, "setting", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.User, (user) => user.parent, { cascade: true }),
    __metadata("design:type", user_model_1.User)
], Nounus.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Nounus.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Nounus.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Nounus.prototype, "deletedAt", void 0);
exports.Nounus = Nounus = __decorate([
    (0, typeorm_1.Entity)()
], Nounus);
