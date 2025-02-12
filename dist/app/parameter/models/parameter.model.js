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
exports.Parameter = void 0;
const typeorm_1 = require("typeorm");
const preference_model_1 = require("../../Preference/models/preference.model");
const parameter_type_model_1 = require("./parameter_type.model");
const user_model_1 = require("../../user/user.model");
const abonnement_model_1 = require("../../abonnement/models/abonnement.model");
const media_model_1 = require("../../media/models/media.model");
let Parameter = class Parameter {
    id;
    name;
    slug;
    description;
    priority;
    type_parameter;
    type_profil;
    role;
    type_abonnements;
    type_media;
    horaire_disponible;
    zone_de_travail;
    tranche_age_enfants;
    besions_specifiques;
    created_at;
    updated_at;
    deleted_at;
};
exports.Parameter = Parameter;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Parameter.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Parameter.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Parameter.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Parameter.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Parameter.prototype, "priority", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parameter_type_model_1.TypeParameter, (type) => type.parameter, { onDelete: 'CASCADE' }),
    __metadata("design:type", parameter_type_model_1.TypeParameter)
], Parameter.prototype, "type_parameter", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_model_1.User, (user) => user.type_profil, { cascade: true }),
    __metadata("design:type", Array)
], Parameter.prototype, "type_profil", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_model_1.User, (user) => user.role, { cascade: true }),
    __metadata("design:type", Array)
], Parameter.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => abonnement_model_1.Abonnements, (abonnement) => abonnement.type, { cascade: true }),
    __metadata("design:type", Array)
], Parameter.prototype, "type_abonnements", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => media_model_1.Medias, (media) => media.type_media, { cascade: true }),
    __metadata("design:type", media_model_1.Medias)
], Parameter.prototype, "type_media", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => preference_model_1.Preference, (preference) => preference.horaire_disponible, { cascade: true }),
    __metadata("design:type", preference_model_1.Preference)
], Parameter.prototype, "horaire_disponible", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => preference_model_1.Preference, (preference) => preference.zone_de_travail, { cascade: true }),
    __metadata("design:type", preference_model_1.Preference)
], Parameter.prototype, "zone_de_travail", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => preference_model_1.Preference, (preference) => preference.tranche_age_enfants, { cascade: true }),
    __metadata("design:type", preference_model_1.Preference)
], Parameter.prototype, "tranche_age_enfants", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => preference_model_1.Preference, (preference) => preference.besions_specifiques, { cascade: true }),
    __metadata("design:type", preference_model_1.Preference)
], Parameter.prototype, "besions_specifiques", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Parameter.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Parameter.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Parameter.prototype, "deleted_at", void 0);
exports.Parameter = Parameter = __decorate([
    (0, typeorm_1.Entity)('parameters')
], Parameter);
