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
exports.settingSubscriptionTypes = void 0;
const abonnement_model_1 = require("../../abonnement/models/abonnement.model");
const typeorm_1 = require("typeorm");
let settingSubscriptionTypes = class settingSubscriptionTypes {
    id;
    slug;
    name;
    description;
    abonnement;
};
exports.settingSubscriptionTypes = settingSubscriptionTypes;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], settingSubscriptionTypes.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, unique: true, nullable: true }),
    __metadata("design:type", String)
], settingSubscriptionTypes.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, unique: false, nullable: false }),
    __metadata("design:type", String)
], settingSubscriptionTypes.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], settingSubscriptionTypes.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => abonnement_model_1.Abonnements, (SU) => SU.type, { cascade: true, onDelete: 'CASCADE' }),
    __metadata("design:type", abonnement_model_1.Abonnements)
], settingSubscriptionTypes.prototype, "abonnement", void 0);
exports.settingSubscriptionTypes = settingSubscriptionTypes = __decorate([
    (0, typeorm_1.Entity)()
], settingSubscriptionTypes);
