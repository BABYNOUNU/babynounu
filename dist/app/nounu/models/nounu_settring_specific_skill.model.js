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
exports.NounuSettingSpecificSkills = void 0;
const typeorm_1 = require("typeorm");
const setting_specific_skill_model_1 = require("../../setting/models/setting_specific_skill.model");
const nounu_model_1 = require("./nounu.model");
let NounuSettingSpecificSkills = class NounuSettingSpecificSkills {
    id;
    nounu;
    skill;
};
exports.NounuSettingSpecificSkills = NounuSettingSpecificSkills;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], NounuSettingSpecificSkills.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => nounu_model_1.Nounus, (nounu) => nounu.settingSpecificSkills, { cascade: true }),
    __metadata("design:type", nounu_model_1.Nounus)
], NounuSettingSpecificSkills.prototype, "nounu", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => setting_specific_skill_model_1.SettingSpecificSkills, (NS) => NS.id, { cascade: true }),
    __metadata("design:type", setting_specific_skill_model_1.SettingSpecificSkills)
], NounuSettingSpecificSkills.prototype, "skill", void 0);
exports.NounuSettingSpecificSkills = NounuSettingSpecificSkills = __decorate([
    (0, typeorm_1.Entity)()
], NounuSettingSpecificSkills);
