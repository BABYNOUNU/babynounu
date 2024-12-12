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
exports.SettingLocalization = void 0;
const nounu_settring_area_work_model_1 = require("../../nounu/models/nounu_settring_area_work.model");
const typeorm_1 = require("typeorm");
let SettingLocalization = class SettingLocalization {
    id;
    slug;
    name;
    description;
    nounuSettingAreaWork;
};
exports.SettingLocalization = SettingLocalization;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SettingLocalization.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, unique: false, nullable: true }),
    __metadata("design:type", String)
], SettingLocalization.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, unique: false, nullable: false }),
    __metadata("design:type", String)
], SettingLocalization.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], SettingLocalization.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => nounu_settring_area_work_model_1.NounuSettingAreaWork, (NSL) => NSL.area, {
        cascade: true, onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], SettingLocalization.prototype, "nounuSettingAreaWork", void 0);
exports.SettingLocalization = SettingLocalization = __decorate([
    (0, typeorm_1.Entity)()
], SettingLocalization);
