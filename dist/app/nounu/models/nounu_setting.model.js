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
exports.NounuSettings = void 0;
const typeorm_1 = require("typeorm");
const setting_age_of_children_model_1 = require("../../setting/models/setting_age_of_children.model");
const setting_guard_schedule_model_1 = require("../../setting/models/setting_guard_schedule.model");
const setting_specific_skill_model_1 = require("../../setting/models/setting_specific_skill.model");
const setting_language_model_1 = require("../../setting/models/setting_language.model");
const setting_localization_model_1 = require("../../setting/models/setting_localization.model");
const nounu_model_1 = require("./nounu.model");
const setting_certification_model_1 = require("../../setting/models/setting_certification.model");
let NounuSettings = class NounuSettings {
};
exports.NounuSettings = NounuSettings;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], NounuSettings.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => nounu_model_1.Nounus, (nounu) => nounu.setting, { onDelete: 'CASCADE' }),
    __metadata("design:type", nounu_model_1.Nounus)
], NounuSettings.prototype, "nounu", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => setting_age_of_children_model_1.settingAgeOfChildren, (AOC) => AOC.nounu, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", setting_specific_skill_model_1.SettingSpecificSkills)
], NounuSettings.prototype, "specific_skills", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => setting_language_model_1.SettingLanguages, (SN) => SN.nounu, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", setting_language_model_1.SettingLanguages)
], NounuSettings.prototype, "language", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => setting_guard_schedule_model_1.SettingGuardSchedules, (AOC) => AOC.nounu, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", setting_guard_schedule_model_1.SettingGuardSchedules)
], NounuSettings.prototype, "guard_schedule", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => setting_localization_model_1.settingLocalization, (SN) => SN.nounu, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", setting_localization_model_1.settingLocalization)
], NounuSettings.prototype, "localization", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => setting_certification_model_1.settingCertifications, (SN) => SN.nounu, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], NounuSettings.prototype, "certification", void 0);
exports.NounuSettings = NounuSettings = __decorate([
    (0, typeorm_1.Entity)()
], NounuSettings);
//# sourceMappingURL=nounu_setting.model.js.map