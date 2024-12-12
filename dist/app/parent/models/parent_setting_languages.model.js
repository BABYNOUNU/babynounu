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
exports.ParentSettingLanguages = void 0;
const typeorm_1 = require("typeorm");
const setting_language_model_1 = require("../../setting/models/setting_language.model");
const parent_model_1 = require("./parent.model");
let ParentSettingLanguages = class ParentSettingLanguages {
    id;
    parent;
    language;
};
exports.ParentSettingLanguages = ParentSettingLanguages;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ParentSettingLanguages.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parent_model_1.Parents, (parent) => parent.settingLanguages, { onDelete: 'CASCADE' }),
    __metadata("design:type", parent_model_1.Parents)
], ParentSettingLanguages.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => setting_language_model_1.SettingLanguages, { onDelete: 'CASCADE' }),
    __metadata("design:type", setting_language_model_1.SettingLanguages)
], ParentSettingLanguages.prototype, "language", void 0);
exports.ParentSettingLanguages = ParentSettingLanguages = __decorate([
    (0, typeorm_1.Entity)()
], ParentSettingLanguages);
