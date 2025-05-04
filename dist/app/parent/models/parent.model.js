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
exports.ProfilParents = void 0;
const user_model_1 = require("../../user/user.model");
const typeorm_1 = require("typeorm");
const preference_model_1 = require("../../Preference/models/preference.model");
const room_model_1 = require("../../rooms/models/room.model");
let ProfilParents = class ProfilParents {
    id;
    fullname;
    adresse_mail;
    phone;
    number_of_children;
    budget_estimated;
    preferences;
    user;
    parentRooms;
    informations_complementaires;
    createdAt;
    updatedAt;
    deletedAt;
};
exports.ProfilParents = ProfilParents;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ProfilParents.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, unique: false, nullable: true }),
    __metadata("design:type", String)
], ProfilParents.prototype, "fullname", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, unique: false, nullable: false }),
    __metadata("design:type", String)
], ProfilParents.prototype, "adresse_mail", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, unique: false, nullable: false }),
    __metadata("design:type", String)
], ProfilParents.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, unique: false, nullable: false }),
    __metadata("design:type", String)
], ProfilParents.prototype, "number_of_children", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, unique: false, nullable: false }),
    __metadata("design:type", String)
], ProfilParents.prototype, "budget_estimated", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => preference_model_1.Preference, (preference) => preference.parents, {
        cascade: true,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], ProfilParents.prototype, "preferences", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.User, (user) => user.parent, { onDelete: 'CASCADE' }),
    __metadata("design:type", user_model_1.User)
], ProfilParents.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => room_model_1.Rooms, (room) => room.parent, {
        cascade: true,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], ProfilParents.prototype, "parentRooms", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ProfilParents.prototype, "informations_complementaires", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ProfilParents.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ProfilParents.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], ProfilParents.prototype, "deletedAt", void 0);
exports.ProfilParents = ProfilParents = __decorate([
    (0, typeorm_1.Entity)()
], ProfilParents);
