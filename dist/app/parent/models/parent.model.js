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
exports.Parents = void 0;
const typeorm_1 = require("typeorm");
const parent_setting_age_of_children_model_1 = require("./parent_setting_age_of_children.model");
const parent_setting_desired_time_model_1 = require("./parent_setting_desired_time.model");
const parent_setting_languages_model_1 = require("./parent_setting_languages.model");
const parent_setting_localization_model_1 = require("./parent_setting_localization.model");
const parent_settring_specific_skill_model_1 = require("./parent_settring_specific_skill.model");
const parent_setting_guard_schedules_model_1 = require("./parent_setting_guard_schedules.model");
const parent_setting_specific_need_model_1 = require("./parent_setting_specific_need.model");
const parent_settring_area_work_model_1 = require("./parent_settring_area_work.model");
const parent_setting_housekeeper_model_1 = require("./parent_setting_housekeeper.model");
const parent_setting_service_frequency_model_1 = require("./parent_setting_service_frequency.model");
let Parents = class Parents {
    id;
    fullname;
    phone;
    adresse;
    budget_min;
    budget_max;
    photo;
    number_of_children;
    localization;
    payment_terms;
    description;
    availabilityServiceProvider;
    settingAgeOfChildrens;
    settingSpecificNeeds;
    settingGuardSchedules;
    settingDesiredTimes;
    settingHousekeepers;
    settingAreaWorks;
    settingLanguages;
    settingLocalizations;
    settingSpecificSkills;
    settingServiceFrequency;
    createdAt;
    updatedAt;
    deletedAt;
};
exports.Parents = Parents;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Parents.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, unique: false, nullable: true }),
    __metadata("design:type", String)
], Parents.prototype, "fullname", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, unique: false, nullable: false }),
    __metadata("design:type", String)
], Parents.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, unique: false, nullable: false }),
    __metadata("design:type", String)
], Parents.prototype, "adresse", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, unique: false, nullable: false }),
    __metadata("design:type", String)
], Parents.prototype, "budget_min", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, unique: false, nullable: false }),
    __metadata("design:type", String)
], Parents.prototype, "budget_max", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: false }),
    __metadata("design:type", String)
], Parents.prototype, "photo", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, nullable: false }),
    __metadata("design:type", String)
], Parents.prototype, "number_of_children", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, nullable: false }),
    __metadata("design:type", String)
], Parents.prototype, "localization", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, unique: false, nullable: false }),
    __metadata("design:type", String)
], Parents.prototype, "payment_terms", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Parents.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, unique: false, nullable: false }),
    __metadata("design:type", String)
], Parents.prototype, "availabilityServiceProvider", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => parent_setting_age_of_children_model_1.ParentSettingAgeOfChildrens, (SN) => SN.parent, { cascade: true, onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Parents.prototype, "settingAgeOfChildrens", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => parent_setting_specific_need_model_1.ParentSettingSpecificNeeds, (SN) => SN.parent, { cascade: true, onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Parents.prototype, "settingSpecificNeeds", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => parent_setting_guard_schedules_model_1.ParentSettingGuardSchedules, (SN) => SN.parent, { cascade: true, onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Parents.prototype, "settingGuardSchedules", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => parent_setting_desired_time_model_1.ParentSettingDeriredTimes, (SN) => SN.parent, { cascade: true, onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Parents.prototype, "settingDesiredTimes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => parent_setting_housekeeper_model_1.ParentSettingHousekeepers, (SN) => SN.parent, { cascade: true, onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Parents.prototype, "settingHousekeepers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => parent_settring_area_work_model_1.ParentSettingAreaWork, (SN) => SN.parent, { cascade: true, onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Parents.prototype, "settingAreaWorks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => parent_setting_languages_model_1.ParentSettingLanguages, (SN) => SN.parent, { cascade: true, onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Parents.prototype, "settingLanguages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => parent_setting_localization_model_1.ParentSettingLocalizations, (SN) => SN.parent, { cascade: true, onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Parents.prototype, "settingLocalizations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => parent_settring_specific_skill_model_1.ParentSettingSpecificSkills, (SN) => SN.parent, { cascade: true, onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Parents.prototype, "settingSpecificSkills", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => parent_setting_service_frequency_model_1.ParentSettingServiceFrequency, (SN) => SN.parent, { cascade: true, onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Parents.prototype, "settingServiceFrequency", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Parents.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Parents.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Parents.prototype, "deletedAt", void 0);
exports.Parents = Parents = __decorate([
    (0, typeorm_1.Entity)()
], Parents);
