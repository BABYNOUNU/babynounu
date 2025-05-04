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
const abonnement_model_1 = require("../abonnement/models/abonnement.model");
const notification_model_1 = require("../notification/models/notification.model");
const job_model_1 = require("../job/models/job.model");
const paiement_model_1 = require("../paiement/models/paiement.model");
const job_application_model_1 = require("../job-application/models/job-application.model");
const parameter_model_1 = require("../parameter/models/parameter.model");
const nounu_model_1 = require("../nounus/models/nounu.model");
const media_model_1 = require("../media/models/media.model");
const room_model_1 = require("../rooms/models/room.model");
const message_model_1 = require("../messages/models/message.model");
let User = class User {
    id;
    slug;
    email;
    password;
    access_token;
    type_profil;
    nounu;
    parent;
    abonnement;
    medias;
    notifications;
    sentNotifications;
    job_to_apply;
    jobs;
    paiements;
    roomSender;
    roomReceiver;
    role;
    messages;
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
    (0, typeorm_1.ManyToOne)(() => parameter_model_1.Parameter, (SN) => SN.type_profil, { onDelete: 'CASCADE' }),
    __metadata("design:type", parameter_model_1.Parameter)
], User.prototype, "type_profil", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => nounu_model_1.ProfilNounus, (nounu) => nounu.user, { cascade: true }),
    __metadata("design:type", Array)
], User.prototype, "nounu", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => parent_model_1.ProfilParents, (parent) => parent.user, { cascade: true }),
    __metadata("design:type", Array)
], User.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => abonnement_model_1.Abonnements, (abonnement) => abonnement.user, {
        cascade: true,
    }),
    __metadata("design:type", abonnement_model_1.Abonnements)
], User.prototype, "abonnement", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => media_model_1.Medias, (media) => media.user, {
        cascade: true,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], User.prototype, "medias", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notification_model_1.Notification, (notification) => notification.user, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "notifications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notification_model_1.Notification, (notification) => notification.sender, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "sentNotifications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => job_application_model_1.JobApplication, (job_to_apply) => job_to_apply.user, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "job_to_apply", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => job_model_1.Job, (job) => job.user, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "jobs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => paiement_model_1.Paiements, (paiement) => paiement.user, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "paiements", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => room_model_1.Rooms, (room) => room.sender, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "roomSender", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => room_model_1.Rooms, (room) => room.receiver, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "roomReceiver", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parameter_model_1.Parameter, (parameter) => parameter.role, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", parameter_model_1.Parameter)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_model_1.Message, message => message.sender),
    __metadata("design:type", Array)
], User.prototype, "messages", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
