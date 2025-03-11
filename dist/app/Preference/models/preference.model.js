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
exports.Preference = void 0;
const typeorm_1 = require("typeorm");
const parameter_model_1 = require("../../parameter/models/parameter.model");
const parent_model_1 = require("../../parent/models/parent.model");
const job_model_1 = require("../../job/models/job.model");
const nounu_model_1 = require("../../nounus/models/nounu.model");
let Preference = class Preference {
    id;
    horaire_disponible;
    zone_de_travail;
    type_services;
    equipement_menager;
    criteres_specifiques;
    certifications_criteres;
    tranche_age_enfants;
    besions_specifiques;
    garde_enfants;
    aide_menagere;
    frequence_des_services;
    horaire_souhaites;
    adress;
    disponibility_du_prestataire;
    zone_geographique_prestataire;
    competance_specifique;
    mode_de_paiement;
    langue_parler;
    criteres_selections;
    parents;
    nounus;
    jobs;
    created_at;
    updated_at;
    deleted_at;
};
exports.Preference = Preference;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Preference.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parameter_model_1.Parameter, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Preference.prototype, "horaire_disponible", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parameter_model_1.Parameter, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Preference.prototype, "zone_de_travail", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parameter_model_1.Parameter, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Preference.prototype, "type_services", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parameter_model_1.Parameter, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Preference.prototype, "equipement_menager", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parameter_model_1.Parameter, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Preference.prototype, "criteres_specifiques", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parameter_model_1.Parameter, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Preference.prototype, "certifications_criteres", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parameter_model_1.Parameter, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Preference.prototype, "tranche_age_enfants", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parameter_model_1.Parameter, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Preference.prototype, "besions_specifiques", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parameter_model_1.Parameter, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Preference.prototype, "garde_enfants", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parameter_model_1.Parameter, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Preference.prototype, "aide_menagere", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parameter_model_1.Parameter, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Preference.prototype, "frequence_des_services", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parameter_model_1.Parameter, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Preference.prototype, "horaire_souhaites", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parameter_model_1.Parameter, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Preference.prototype, "adress", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parameter_model_1.Parameter, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Preference.prototype, "disponibility_du_prestataire", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parameter_model_1.Parameter, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Preference.prototype, "zone_geographique_prestataire", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parameter_model_1.Parameter, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Preference.prototype, "competance_specifique", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parameter_model_1.Parameter, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Preference.prototype, "mode_de_paiement", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parameter_model_1.Parameter, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Preference.prototype, "langue_parler", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parameter_model_1.Parameter, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Preference.prototype, "criteres_selections", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parent_model_1.Parents, (parent) => parent.preferences, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", parent_model_1.Parents)
], Preference.prototype, "parents", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => nounu_model_1.Nounus, (nounu) => nounu.preferences, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", nounu_model_1.Nounus)
], Preference.prototype, "nounus", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => job_model_1.Job, (job) => job.preferences, { onDelete: 'CASCADE' }),
    __metadata("design:type", job_model_1.Job)
], Preference.prototype, "jobs", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Preference.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Preference.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Preference.prototype, "deleted_at", void 0);
exports.Preference = Preference = __decorate([
    (0, typeorm_1.Entity)('user_preferences')
], Preference);
