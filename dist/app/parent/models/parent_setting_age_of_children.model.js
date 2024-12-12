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
exports.ParentSettingAgeOfChildrens = void 0;
const typeorm_1 = require("typeorm");
const setting_age_of_children_model_1 = require("../../setting/models/setting_age_of_children.model");
const parent_model_1 = require("./parent.model");
let ParentSettingAgeOfChildrens = class ParentSettingAgeOfChildrens {
    id;
    parent;
    AgeOfChildrens;
};
exports.ParentSettingAgeOfChildrens = ParentSettingAgeOfChildrens;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ParentSettingAgeOfChildrens.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parent_model_1.Parents, (parent) => parent.settingAgeOfChildrens, { onDelete: 'CASCADE' }),
    __metadata("design:type", parent_model_1.Parents)
], ParentSettingAgeOfChildrens.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => setting_age_of_children_model_1.SettingAgeOfChildren, { onDelete: 'CASCADE' }),
    __metadata("design:type", setting_age_of_children_model_1.SettingAgeOfChildren)
], ParentSettingAgeOfChildrens.prototype, "AgeOfChildrens", void 0);
exports.ParentSettingAgeOfChildrens = ParentSettingAgeOfChildrens = __decorate([
    (0, typeorm_1.Entity)()
], ParentSettingAgeOfChildrens);
