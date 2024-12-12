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
exports.NounuSettingLocalizations = void 0;
const typeorm_1 = require("typeorm");
const setting_localization_model_1 = require("../../setting/models/setting_localization.model");
const nounu_model_1 = require("./nounu.model");
let NounuSettingLocalizations = class NounuSettingLocalizations {
    id;
    nounu;
    loacalization;
};
exports.NounuSettingLocalizations = NounuSettingLocalizations;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], NounuSettingLocalizations.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => nounu_model_1.Nounus, (nounu) => nounu.settingLocalizations, { onDelete: 'CASCADE' }),
    __metadata("design:type", nounu_model_1.Nounus)
], NounuSettingLocalizations.prototype, "nounu", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => setting_localization_model_1.SettingLocalization, { onDelete: 'CASCADE' }),
    __metadata("design:type", setting_localization_model_1.SettingLocalization)
], NounuSettingLocalizations.prototype, "loacalization", void 0);
exports.NounuSettingLocalizations = NounuSettingLocalizations = __decorate([
    (0, typeorm_1.Entity)()
], NounuSettingLocalizations);
