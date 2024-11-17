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
exports.ParentSettings = void 0;
const parent_model_1 = require("./parent.model");
const typeorm_1 = require("typeorm");
const setting_age_of_children_model_1 = require("../../setting/models/setting_age_of_children.model");
const setting_guard_schedule_model_1 = require("../../setting/models/setting_guard_schedule.model");
const setting_specific_need_model_1 = require("../../setting/models/setting_specific_need.model");
const setting_specific_skill_model_1 = require("../../setting/models/setting_specific_skill.model");
const setting_language_model_1 = require("../../setting/models/setting_language.model");
const setting_localization_model_1 = require("../../setting/models/setting_localization.model");
let ParentSettings = class ParentSettings {
    id;
    parent;
    age_of_children;
    guard_schedule;
    specific_need;
    specific_skills;
    language;
    localization;
    work_area;
    createdAt;
    updatedAt;
    deletedAt;
};
exports.ParentSettings = ParentSettings;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ParentSettings.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => parent_model_1.Parents, (parent) => parent.setting, { onDelete: 'CASCADE' }),
    __metadata("design:type", parent_model_1.Parents)
], ParentSettings.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => setting_age_of_children_model_1.SettingAgeOfChildren, (AOC) => AOC.parent, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", setting_age_of_children_model_1.SettingAgeOfChildren)
], ParentSettings.prototype, "age_of_children", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => setting_guard_schedule_model_1.SettingGuardSchedules, (GS) => GS.parent, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", setting_guard_schedule_model_1.SettingGuardSchedules)
], ParentSettings.prototype, "guard_schedule", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => setting_specific_need_model_1.SettingSpecificNeed, (SN) => SN.parent, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", setting_specific_need_model_1.SettingSpecificNeed)
], ParentSettings.prototype, "specific_need", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => setting_specific_skill_model_1.SettingSpecificSkills, (SN) => SN.parent, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", setting_specific_skill_model_1.SettingSpecificSkills)
], ParentSettings.prototype, "specific_skills", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => setting_language_model_1.SettingLanguages, (SN) => SN.parent, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", setting_language_model_1.SettingLanguages)
], ParentSettings.prototype, "language", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => setting_localization_model_1.SettingLocalization, (SN) => SN.parent, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", setting_localization_model_1.SettingLocalization)
], ParentSettings.prototype, "localization", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => setting_localization_model_1.SettingLocalization, (SN) => SN.parent, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], ParentSettings.prototype, "work_area", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ParentSettings.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ParentSettings.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], ParentSettings.prototype, "deletedAt", void 0);
exports.ParentSettings = ParentSettings = __decorate([
    (0, typeorm_1.Entity)()
], ParentSettings);
