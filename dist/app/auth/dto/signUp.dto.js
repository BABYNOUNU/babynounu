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
exports.SginUpAuthDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class SginUpAuthDto {
}
exports.SginUpAuthDto = SginUpAuthDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Bill Pather',
        required: true,
    }),
    (0, class_validator_1.IsString)({ message: 'Ce champs est requis' }),
    (0, class_validator_1.MinLength)(3, {
        message: 'le nom doit  être compris entre 3 et 10 caractéres',
    }),
    __metadata("design:type", String)
], SginUpAuthDto.prototype, "fullname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'bill-pather-9520',
        required: false,
    }),
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], SginUpAuthDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'rehmat.sayani@gmail.com',
        required: true,
    }),
    (0, class_validator_1.IsString)({ message: 'Ce champs est requis' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Email invalide' }),
    __metadata("design:type", String)
], SginUpAuthDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'password',
        required: true,
    }),
    (0, class_validator_1.IsString)({ message: 'Ce champs est requis' }),
    __metadata("design:type", String)
], SginUpAuthDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '1',
        required: true
    }),
    (0, class_validator_1.IsString)({ message: 'Ce champs est requis' }),
    __metadata("design:type", Object)
], SginUpAuthDto.prototype, "role", void 0);
//# sourceMappingURL=signUp.dto.js.map