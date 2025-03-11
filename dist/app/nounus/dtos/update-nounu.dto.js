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
exports.UpdateNounuDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateNounuDto {
    fullname;
    age;
    phone;
    annees_experience;
    urgences;
    tarif_horaire;
    tarif_mensuel;
    flexibilite_tarifaire;
    courte_biographie;
    evaluation_precedentes;
    userId;
    zone_de_travail;
    besions_specifiques;
    aide_menagere;
    frequence_des_services;
    horaire_disponible;
    adress;
    tranche_age_enfants;
    competance_specifique;
    langue_parler;
    certifications_criteres;
}
exports.UpdateNounuDto = UpdateNounuDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The fullName of the Nounu', example: 'Nounu 1' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNounuDto.prototype, "fullname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The age of the Nounu', example: '25' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNounuDto.prototype, "age", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The phone of the Nounu',
        example: '514-123-4567',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNounuDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The annees_experience of the Nounu',
        example: '2',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNounuDto.prototype, "annees_experience", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The urgences of the Nounu', example: 'false' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNounuDto.prototype, "urgences", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The tarif_horaire of the Nounu',
        example: '20.00',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNounuDto.prototype, "tarif_horaire", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The tarif_mensuel of the Nounu',
        example: '800.00',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNounuDto.prototype, "tarif_mensuel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The flexibilite_tarifaire of the Nounu',
        example: 'true',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNounuDto.prototype, "flexibilite_tarifaire", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The courte_biographie of the Nounu',
        example: 'This is a Nounu',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNounuDto.prototype, "courte_biographie", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The evaluation_precedentes of the Nounu',
        example: 'Good',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNounuDto.prototype, "evaluation_precedentes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The user ID of the Nounu',
        example: '1234567890',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNounuDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The zone_de_travail of the Nounu',
        example: "Montr'eal",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNounuDto.prototype, "zone_de_travail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The besions_specifiques of the Nounu',
        example: 'Diab`ete',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNounuDto.prototype, "besions_specifiques", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The aide_menagere of the Nounu',
        example: 'true',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNounuDto.prototype, "aide_menagere", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The frequence_des_services of the Nounu',
        example: '3 fois par semaine',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNounuDto.prototype, "frequence_des_services", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The horaire_disponible of the Nounu',
        example: '8h00 - 18h00',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNounuDto.prototype, "horaire_disponible", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The adress of the Nounu',
        example: "1200, rue Sainte-Catherine O, Montr'eal, QC H3G 1P1",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNounuDto.prototype, "adress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The tranche_age_enfants of the Nounu',
        example: '0 - 12',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNounuDto.prototype, "tranche_age_enfants", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The competance_specifique of the Nounu',
        example: 'Soins de base',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNounuDto.prototype, "competance_specifique", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The langue_parler of the Nounu',
        example: 'francais',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNounuDto.prototype, "langue_parler", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The certifications_criteres of the Nounu',
        example: 'Soins de base',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNounuDto.prototype, "certifications_criteres", void 0);
