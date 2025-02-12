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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreferenceController = void 0;
const common_1 = require("@nestjs/common");
const preference_service_1 = require("./preference.service");
const swagger_1 = require("@nestjs/swagger");
let PreferenceController = class PreferenceController {
    preferenceService;
    constructor(preferenceService) {
        this.preferenceService = preferenceService;
    }
    findAll() {
        return this.preferenceService.findAll();
    }
    findOne(id) {
        return this.preferenceService.findOne(id);
    }
};
exports.PreferenceController = PreferenceController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PreferenceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PreferenceController.prototype, "findOne", null);
exports.PreferenceController = PreferenceController = __decorate([
    (0, swagger_1.ApiTags)('Preferences'),
    (0, common_1.Controller)('preferences'),
    __metadata("design:paramtypes", [preference_service_1.PreferenceService])
], PreferenceController);
