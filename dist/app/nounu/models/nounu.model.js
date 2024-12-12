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
const nounu_setting_languages_model_1 = require("./nounu_setting_languages.model");
const nounu_setting_localization_model_1 = require("./nounu_setting_localization.model");
const nounu_setting_age_of_children_model_1 = require("./nounu_setting_age_of_children.model");
const nounu_setting_certification_model_1 = require("./nounu_setting_certification.model");
const nounu_setting_desired_time_model_1 = require("./nounu_setting_desired_time.model");
const nounu_settring_area_work_model_1 = require("./nounu_settring_area_work.model");
const nounu_settring_specific_skill_model_1 = require("./nounu_settring_specific_skill.model");
let Nounus = class Nounus {
    id;
    fullname;
    media;
    old;
    phone;
    adresse;
    year_experience;
    reference_1;
    reference_2;
    reference_3;
    hourly_rate;
    monthly_rate;
    biographie;
    emergencie;
    pricing_flexibility;
    confirmed_identity;
    photo;
    user;
    settingLanguages;
    settingLocalizations;
    settingAgeOfChildrens;
    settingCertifications;
    settingDesiredTimes;
    settingAreaWorks;
    settingSpecificSkills;
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
    (0, typeorm_1.Column)('varchar', { length: 255, nullable: true }),
    __metadata("design:type", String)
], Nounus.prototype, "fullname", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => media_model_1.Medias, (media) => media.media_nounu, { cascade: true }),
    __metadata("design:type", Array)
], Nounus.prototype, "media", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, nullable: false }),
    __metadata("design:type", String)
], Nounus.prototype, "old", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, nullable: false }),
    __metadata("design:type", String)
], Nounus.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, nullable: false }),
    __metadata("design:type", String)
], Nounus.prototype, "adresse", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, nullable: false }),
    __metadata("design:type", String)
], Nounus.prototype, "year_experience", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, nullable: false }),
    __metadata("design:type", String)
], Nounus.prototype, "reference_1", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, nullable: true }),
    __metadata("design:type", String)
], Nounus.prototype, "reference_2", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, nullable: true }),
    __metadata("design:type", String)
], Nounus.prototype, "reference_3", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, nullable: true }),
    __metadata("design:type", String)
], Nounus.prototype, "hourly_rate", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, nullable: true }),
    __metadata("design:type", String)
], Nounus.prototype, "monthly_rate", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Nounus.prototype, "biographie", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false, nullable: true }),
    __metadata("design:type", Boolean)
], Nounus.prototype, "emergencie", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false, nullable: true }),
    __metadata("design:type", Boolean)
], Nounus.prototype, "pricing_flexibility", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Nounus.prototype, "confirmed_identity", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Nounus.prototype, "photo", void 0);
__decorate([
    (0, typeorm_1.OneToOne)((type) => user_model_1.User, (user) => user.nounu, { onDelete: 'CASCADE' }),
    __metadata("design:type", user_model_1.User)
], Nounus.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => nounu_setting_languages_model_1.NounuSettingLanguages, (SN) => SN.nounu, {
        cascade: true,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Nounus.prototype, "settingLanguages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => nounu_setting_localization_model_1.NounuSettingLocalizations, (SN) => SN.nounu, {
        cascade: true,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Nounus.prototype, "settingLocalizations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => nounu_setting_age_of_children_model_1.NounuSettingAgeOfChildrens, (SN) => SN.nounu, {
        cascade: true,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Nounus.prototype, "settingAgeOfChildrens", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => nounu_setting_certification_model_1.NounuSettingCertifications, (SN) => SN.nounu, {
        cascade: true,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Nounus.prototype, "settingCertifications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => nounu_setting_desired_time_model_1.NounuSettingDeriredTimes, (SN) => SN.nounu, {
        cascade: true,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Nounus.prototype, "settingDesiredTimes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => nounu_settring_area_work_model_1.NounuSettingAreaWork, (SN) => SN.nounu, {
        cascade: true,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Nounus.prototype, "settingAreaWorks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => nounu_settring_specific_skill_model_1.NounuSettingSpecificSkills, (SN) => SN.nounu, {
        cascade: true,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Nounus.prototype, "settingSpecificSkills", void 0);
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
