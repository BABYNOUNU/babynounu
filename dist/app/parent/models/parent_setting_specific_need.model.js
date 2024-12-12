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
exports.ParentSettingSpecificNeeds = void 0;
const typeorm_1 = require("typeorm");
const setting_specific_need_model_1 = require("../../setting/models/setting_specific_need.model");
const parent_model_1 = require("./parent.model");
let ParentSettingSpecificNeeds = class ParentSettingSpecificNeeds {
    id;
    parent;
    SpecificNeeds;
};
exports.ParentSettingSpecificNeeds = ParentSettingSpecificNeeds;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ParentSettingSpecificNeeds.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parent_model_1.Parents, (parent) => parent.settingSpecificNeeds, { onDelete: 'CASCADE' }),
    __metadata("design:type", parent_model_1.Parents)
], ParentSettingSpecificNeeds.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => setting_specific_need_model_1.SettingSpecificNeed, { onDelete: 'CASCADE' }),
    __metadata("design:type", setting_specific_need_model_1.SettingSpecificNeed)
], ParentSettingSpecificNeeds.prototype, "SpecificNeeds", void 0);
exports.ParentSettingSpecificNeeds = ParentSettingSpecificNeeds = __decorate([
    (0, typeorm_1.Entity)()
], ParentSettingSpecificNeeds);
