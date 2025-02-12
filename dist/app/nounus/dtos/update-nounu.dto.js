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
    fullName;
    age;
    phone;
    annees_experience;
    urgences;
    tarif_horaire;
    tarif_mensuel;
    flexibilite_tarifaire;
    courte_biographie;
}
exports.UpdateNounuDto = UpdateNounuDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The full name of the Nounu', example: 'Updated Nounu' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNounuDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The age of the Nounu', example: '30' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNounuDto.prototype, "age", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The phone number of the Nounu', example: '123-456-7890' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNounuDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The years of experience of the Nounu', example: '5' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNounuDto.prototype, "annees_experience", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Emergency services availability', example: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNounuDto.prototype, "urgences", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Hourly rate of the Nounu', example: '25.00' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNounuDto.prototype, "tarif_horaire", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Monthly rate of the Nounu', example: '1000.00' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNounuDto.prototype, "tarif_mensuel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Rate flexibility', example: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNounuDto.prototype, "flexibilite_tarifaire", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Short biography of the Nounu', example: 'Experienced child caregiver' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNounuDto.prototype, "courte_biographie", void 0);
