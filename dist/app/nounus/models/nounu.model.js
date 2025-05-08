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
exports.ProfilNounus = void 0;
const preference_model_1 = require("../../Preference/models/preference.model");
const room_model_1 = require("../../rooms/models/room.model");
const user_model_1 = require("../../user/user.model");
const typeorm_1 = require("typeorm");
let ProfilNounus = class ProfilNounus {
    id;
    fullname;
    age;
    phone;
    annees_experience;
    tarif_horaire;
    status;
    points;
    tarif_mensuel;
    flexibilite_tarifaire;
    urgences;
    certif;
    evaluation_precedentes;
    references;
    courte_biographie;
    preferences;
    user;
    nounouRooms;
    createdAt;
    updatedAt;
    deletedAt;
};
exports.ProfilNounus = ProfilNounus;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ProfilNounus.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProfilNounus.prototype, "fullname", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProfilNounus.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], ProfilNounus.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProfilNounus.prototype, "annees_experience", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProfilNounus.prototype, "tarif_horaire", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: 'disponible' }),
    __metadata("design:type", String)
], ProfilNounus.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', default: 0 }),
    __metadata("design:type", Number)
], ProfilNounus.prototype, "points", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProfilNounus.prototype, "tarif_mensuel", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ProfilNounus.prototype, "flexibilite_tarifaire", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ProfilNounus.prototype, "urgences", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ProfilNounus.prototype, "certif", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], ProfilNounus.prototype, "evaluation_precedentes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], ProfilNounus.prototype, "references", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], ProfilNounus.prototype, "courte_biographie", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => preference_model_1.Preference, (preference) => preference.nounus, {
        cascade: true,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], ProfilNounus.prototype, "preferences", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.User, (user) => user.nounu, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_model_1.User)
], ProfilNounus.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => room_model_1.Rooms, (room) => room.nounou),
    __metadata("design:type", Array)
], ProfilNounus.prototype, "nounouRooms", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], ProfilNounus.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], ProfilNounus.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], ProfilNounus.prototype, "deletedAt", void 0);
exports.ProfilNounus = ProfilNounus = __decorate([
    (0, typeorm_1.Entity)()
], ProfilNounus);
