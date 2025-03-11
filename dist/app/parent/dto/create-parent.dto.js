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
exports.CreateParentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateParentDto {
    fullname;
    adresse_mail;
    phone;
    number_of_children;
    budget_estimated;
    disponibility_du_prestataire;
    besions_specifiques;
    garde_enfants;
    aide_menagere;
    frequence_des_services;
    horaire_souhaites;
    adress;
    zone_geographique_prestataire;
    competance_specifique;
    langue_parler;
    mode_de_paiement;
    informations_complementaires;
    userId;
}
exports.CreateParentDto = CreateParentDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateParentDto.prototype, "fullname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateParentDto.prototype, "adresse_mail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateParentDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateParentDto.prototype, "number_of_children", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateParentDto.prototype, "budget_estimated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [] }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateParentDto.prototype, "disponibility_du_prestataire", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [] }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateParentDto.prototype, "besions_specifiques", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [] }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateParentDto.prototype, "garde_enfants", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [] }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateParentDto.prototype, "aide_menagere", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [] }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateParentDto.prototype, "frequence_des_services", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [] }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateParentDto.prototype, "horaire_souhaites", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [] }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateParentDto.prototype, "adress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [] }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateParentDto.prototype, "zone_geographique_prestataire", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [] }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateParentDto.prototype, "competance_specifique", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [] }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateParentDto.prototype, "langue_parler", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [] }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateParentDto.prototype, "mode_de_paiement", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateParentDto.prototype, "informations_complementaires", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateParentDto.prototype, "userId", void 0);
