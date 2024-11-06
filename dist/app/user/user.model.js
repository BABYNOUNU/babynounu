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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const parent_model_1 = require("../parent/models/parent.model");
const role_model_1 = require("../role/models/role.model");
const nounu_model_1 = require("../nounu/models/nounu.model");
const abonnement_model_1 = require("../abonnement/models/abonnement.model");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, unique: true }),
    __metadata("design:type", String)
], User.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], User.prototype, "access_token", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => parent_model_1.Parents, (parent) => parent.user, { onDelete: 'CASCADE' }),
    __metadata("design:type", parent_model_1.Parents)
], User.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => nounu_model_1.Nounus, (nounu) => nounu.user, { onDelete: 'CASCADE' }),
    __metadata("design:type", nounu_model_1.Nounus)
], User.prototype, "nounu", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => abonnement_model_1.Abonnements, (abonnement) => abonnement.user, { onDelete: 'CASCADE' }),
    __metadata("design:type", nounu_model_1.Nounus)
], User.prototype, "abonnement", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => role_model_1.Roles, (role) => role.user, { cascade: true }),
    __metadata("design:type", role_model_1.Roles)
], User.prototype, "role", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
//# sourceMappingURL=user.model.js.map