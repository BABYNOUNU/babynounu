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
exports.Abonnements = void 0;
const paiement_model_1 = require("../../paiement/models/paiement.model");
const setting_subscription_type_model_1 = require("../../setting/models/setting_subscription_type.model");
const user_model_1 = require("../../user/user.model");
const typeorm_1 = require("typeorm");
let Abonnements = class Abonnements {
    id;
    paiement;
    type;
    user;
    createdAt;
    updatedAt;
    deletedAt;
};
exports.Abonnements = Abonnements;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Abonnements.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => paiement_model_1.Paiements, (SN) => SN.abonnement, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", paiement_model_1.Paiements)
], Abonnements.prototype, "paiement", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => setting_subscription_type_model_1.settingSubscriptionTypes, (SN) => SN.abonnement, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", setting_subscription_type_model_1.settingSubscriptionTypes)
], Abonnements.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.User, (user) => user.abonnement, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", user_model_1.User)
], Abonnements.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Abonnements.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Abonnements.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Abonnements.prototype, "deletedAt", void 0);
exports.Abonnements = Abonnements = __decorate([
    (0, typeorm_1.Entity)()
], Abonnements);
