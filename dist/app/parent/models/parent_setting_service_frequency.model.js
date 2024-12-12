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
exports.ParentSettingServiceFrequency = void 0;
const typeorm_1 = require("typeorm");
const parent_model_1 = require("./parent.model");
const setting_service_frequency_model_1 = require("../../setting/models/setting_service_frequency.model");
let ParentSettingServiceFrequency = class ParentSettingServiceFrequency {
    id;
    parent;
    service;
};
exports.ParentSettingServiceFrequency = ParentSettingServiceFrequency;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ParentSettingServiceFrequency.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parent_model_1.Parents, (parent) => parent.settingSpecificSkills, { onDelete: 'CASCADE' }),
    __metadata("design:type", parent_model_1.Parents)
], ParentSettingServiceFrequency.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => setting_service_frequency_model_1.SettingServiceFrequency, { onDelete: 'CASCADE' }),
    __metadata("design:type", setting_service_frequency_model_1.SettingServiceFrequency)
], ParentSettingServiceFrequency.prototype, "service", void 0);
exports.ParentSettingServiceFrequency = ParentSettingServiceFrequency = __decorate([
    (0, typeorm_1.Entity)()
], ParentSettingServiceFrequency);
