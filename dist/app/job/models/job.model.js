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
exports.Job = void 0;
const typeorm_1 = require("typeorm");
const user_model_1 = require("../../user/user.model");
const notification_model_1 = require("../../notification/models/notification.model");
const job_application_model_1 = require("../../job-application/models/job-application.model");
const preference_model_1 = require("../../Preference/models/preference.model");
const media_model_1 = require("../../media/models/media.model");
let Job = class Job {
    id;
    titre;
    description;
    moyens_de_contact;
    inclusWeekend;
    nombreEnfants;
    experience_minimun;
    annee_experience;
    tarifPropose;
    negociable;
    dateDebut;
    missionUrgente;
    descriptionComplementaire;
    preferences;
    jobApplications;
    notifications;
    medias;
    user;
    createdAt;
    updatedAt;
    deletedAt;
};
exports.Job = Job;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Job.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], Job.prototype, "titre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Job.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Job.prototype, "moyens_de_contact", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'inclus_weekend', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Job.prototype, "inclusWeekend", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nombre_enfants', type: 'varchar', nullable: true, default: '' }),
    __metadata("design:type", String)
], Job.prototype, "nombreEnfants", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'experience_minimun', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Job.prototype, "experience_minimun", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'annee_experience', type: 'varchar', nullable: true, default: '' }),
    __metadata("design:type", String)
], Job.prototype, "annee_experience", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tarif_propose', type: 'varchar', nullable: true, default: '' }),
    __metadata("design:type", String)
], Job.prototype, "tarifPropose", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Job.prototype, "negociable", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'date_debut', type: 'varchar', default: '' }),
    __metadata("design:type", String)
], Job.prototype, "dateDebut", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'mission_urgente', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Job.prototype, "missionUrgente", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'description_complementaire', type: 'text' }),
    __metadata("design:type", String)
], Job.prototype, "descriptionComplementaire", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => preference_model_1.Preference, (preference) => preference.jobs, {
        cascade: true,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Job.prototype, "preferences", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => job_application_model_1.JobApplication, (jobApplication) => jobApplication.jobs, {
        cascade: true,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Job.prototype, "jobApplications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notification_model_1.Notification, (notification) => notification.job, {
        cascade: true,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Job.prototype, "notifications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => media_model_1.Medias, (medias) => medias.job, {
        cascade: true,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Job.prototype, "medias", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.User, (user) => user.jobs, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_model_1.User)
], Job.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], Job.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], Job.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Job.prototype, "deletedAt", void 0);
exports.Job = Job = __decorate([
    (0, typeorm_1.Entity)('job')
], Job);
