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
exports.Medias = void 0;
const job_model_1 = require("../../job/models/job.model");
const parameter_model_1 = require("../../parameter/models/parameter.model");
const user_model_1 = require("../../user/user.model");
const typeorm_1 = require("typeorm");
let Medias = class Medias {
    id;
    originalName;
    filename;
    path;
    originalUrl;
    user;
    job;
    type_media;
    createdAt;
    updatedAt;
    deletedAt;
};
exports.Medias = Medias;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Medias.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Medias.prototype, "originalName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Medias.prototype, "filename", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Medias.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Medias.prototype, "originalUrl", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.User, (user) => user.medias, { onDelete: 'CASCADE' }),
    __metadata("design:type", user_model_1.User)
], Medias.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => job_model_1.Job, (job) => job.medias, { onDelete: 'CASCADE' }),
    __metadata("design:type", job_model_1.Job)
], Medias.prototype, "job", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parameter_model_1.Parameter, (parameter) => parameter.type_media),
    __metadata("design:type", parameter_model_1.Parameter)
], Medias.prototype, "type_media", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], Medias.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], Medias.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Medias.prototype, "deletedAt", void 0);
exports.Medias = Medias = __decorate([
    (0, typeorm_1.Entity)()
], Medias);
