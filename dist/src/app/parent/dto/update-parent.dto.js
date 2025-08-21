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
exports.UpdateParentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_parent_dto_1 = require("./create-parent.dto");
const class_validator_1 = require("class-validator");
class UpdateParentDto extends (0, swagger_1.PartialType)(create_parent_dto_1.CreateParentDto) {
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
exports.UpdateParentDto = UpdateParentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateParentDto.prototype, "fullname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateParentDto.prototype, "adresse_mail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateParentDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateParentDto.prototype, "number_of_children", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateParentDto.prototype, "budget_estimated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [] }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateParentDto.prototype, "disponibility_du_prestataire", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [] }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateParentDto.prototype, "besions_specifiques", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [] }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateParentDto.prototype, "garde_enfants", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [] }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateParentDto.prototype, "aide_menagere", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [] }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateParentDto.prototype, "frequence_des_services", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [] }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateParentDto.prototype, "horaire_souhaites", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [] }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateParentDto.prototype, "adress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [] }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateParentDto.prototype, "zone_geographique_prestataire", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [] }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateParentDto.prototype, "competance_specifique", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [] }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateParentDto.prototype, "langue_parler", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [] }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateParentDto.prototype, "mode_de_paiement", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateParentDto.prototype, "informations_complementaires", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateParentDto.prototype, "userId", void 0);
