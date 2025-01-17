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
exports.UpdateJobDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class UpdateJobDto {
    title;
    description;
    location;
    salary;
}
exports.UpdateJobDto = UpdateJobDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Senior Software Engineer', description: 'Updated title of the job', required: false }),
    __metadata("design:type", String)
], UpdateJobDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Develop and maintain complex software applications', description: 'Updated description of the job', required: false }),
    __metadata("design:type", String)
], UpdateJobDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'San Francisco, USA', description: 'Updated location of the job', required: false }),
    __metadata("design:type", String)
], UpdateJobDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100000, description: 'Updated salary offered for the job', required: false }),
    __metadata("design:type", Number)
], UpdateJobDto.prototype, "salary", void 0);
