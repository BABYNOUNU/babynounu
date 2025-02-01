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
let Job = class Job {
    id;
    title;
    description;
    budget_min;
    budget_max;
    service_frequency;
    notifications;
    job_application;
    schedules_available;
    user;
};
exports.Job = Job;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Job.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Job.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "budget_min", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "budget_max", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "service_frequency", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notification_model_1.Notification, (notification) => notification.job),
    __metadata("design:type", Array)
], Job.prototype, "notifications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => job_application_model_1.JobApplication, (jobApplication) => jobApplication.jobs, { cascade: true }),
    __metadata("design:type", job_application_model_1.JobApplication)
], Job.prototype, "job_application", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "schedules_available", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.User, (user) => user.jobs),
    __metadata("design:type", user_model_1.User)
], Job.prototype, "user", void 0);
exports.Job = Job = __decorate([
    (0, typeorm_1.Entity)('job')
], Job);
