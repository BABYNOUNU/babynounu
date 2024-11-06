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
exports.Parents = void 0;
const media_model_1 = require("../../media/models/media.model");
const user_model_1 = require("../../user/user.model");
const typeorm_1 = require("typeorm");
const parent_setting_model_1 = require("./parent_setting.model");
let Parents = class Parents {
    id;
    fullname;
    media;
    old;
    phone;
    adresse;
    setting;
    budget_min;
    budget_max;
    mode_de_paiement;
    user;
    createdAt;
    updatedAt;
    deletedAt;
};
exports.Parents = Parents;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Parents.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, unique: false, nullable: true }),
    __metadata("design:type", String)
], Parents.prototype, "fullname", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => media_model_1.Medias, (media) => media.media_parent, { cascade: true }),
    __metadata("design:type", Array)
], Parents.prototype, "media", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, unique: false, nullable: false }),
    __metadata("design:type", String)
], Parents.prototype, "old", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, unique: false, nullable: false }),
    __metadata("design:type", String)
], Parents.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, unique: false, nullable: false }),
    __metadata("design:type", String)
], Parents.prototype, "adresse", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parent_setting_model_1.ParentSettings, (parent) => parent.id, { cascade: true }),
    __metadata("design:type", Array)
], Parents.prototype, "setting", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, unique: false, nullable: false }),
    __metadata("design:type", String)
], Parents.prototype, "budget_min", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, unique: false, nullable: false }),
    __metadata("design:type", String)
], Parents.prototype, "budget_max", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, unique: false, nullable: false }),
    __metadata("design:type", String)
], Parents.prototype, "mode_de_paiement", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.User, (user) => user.parent, { cascade: true }),
    __metadata("design:type", user_model_1.User)
], Parents.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Parents.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Parents.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Parents.prototype, "deletedAt", void 0);
exports.Parents = Parents = __decorate([
    (0, typeorm_1.Entity)()
], Parents);
