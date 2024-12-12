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
exports.ParentSettingLocalizations = void 0;
const typeorm_1 = require("typeorm");
const setting_localization_model_1 = require("../../setting/models/setting_localization.model");
const parent_model_1 = require("./parent.model");
let ParentSettingLocalizations = class ParentSettingLocalizations {
    id;
    parent;
    loacalization;
};
exports.ParentSettingLocalizations = ParentSettingLocalizations;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ParentSettingLocalizations.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parent_model_1.Parents, (parent) => parent.settingLocalizations, { onDelete: 'CASCADE' }),
    __metadata("design:type", parent_model_1.Parents)
], ParentSettingLocalizations.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => setting_localization_model_1.SettingLocalization, { onDelete: 'CASCADE' }),
    __metadata("design:type", setting_localization_model_1.SettingLocalization)
], ParentSettingLocalizations.prototype, "loacalization", void 0);
exports.ParentSettingLocalizations = ParentSettingLocalizations = __decorate([
    (0, typeorm_1.Entity)()
], ParentSettingLocalizations);
