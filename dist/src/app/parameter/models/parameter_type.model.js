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
exports.TypeParameter = void 0;
const parameter_model_1 = require("./parameter.model");
const typeorm_1 = require("typeorm");
let TypeParameter = class TypeParameter {
    id;
    slug;
    name;
    parameter;
    created_at;
    updated_at;
    deleted_at;
};
exports.TypeParameter = TypeParameter;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TypeParameter.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TypeParameter.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TypeParameter.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => parameter_model_1.Parameter, (parameter) => parameter.type_parameter, { cascade: true }),
    __metadata("design:type", parameter_model_1.Parameter)
], TypeParameter.prototype, "parameter", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], TypeParameter.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], TypeParameter.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], TypeParameter.prototype, "deleted_at", void 0);
exports.TypeParameter = TypeParameter = __decorate([
    (0, typeorm_1.Entity)("parameter_types")
], TypeParameter);
