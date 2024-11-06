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
exports.SettingGuardScheduleController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const general_service_1 = require("../general.service");
const typeorm_1 = require("typeorm");
let SettingGuardScheduleController = class SettingGuardScheduleController {
    settingGeneraleService;
    settingGuardSchedulesRepository;
    constructor(settingGeneraleService, settingGuardSchedulesRepository) {
        this.settingGeneraleService = settingGeneraleService;
        this.settingGuardSchedulesRepository = settingGuardSchedulesRepository;
    }
    GetSettings() {
        return this.settingGeneraleService.settings(this.settingGuardSchedulesRepository);
    }
    GetSetting() { }
    CreateSetting() { }
    UpdateSetting() { }
    DeleteSetting(id) { }
};
exports.SettingGuardScheduleController = SettingGuardScheduleController;
__decorate([
    (0, common_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SettingGuardScheduleController.prototype, "GetSettings", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SettingGuardScheduleController.prototype, "GetSetting", null);
__decorate([
    (0, common_1.Post)('create'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SettingGuardScheduleController.prototype, "CreateSetting", null);
__decorate([
    (0, common_1.Patch)('update/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SettingGuardScheduleController.prototype, "UpdateSetting", null);
__decorate([
    (0, common_1.Delete)('/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SettingGuardScheduleController.prototype, "DeleteSetting", null);
exports.SettingGuardScheduleController = SettingGuardScheduleController = __decorate([
    (0, swagger_1.ApiTags)('Setting Guard Schedule'),
    (0, common_1.Controller)('setting/guard_schedule'),
    __param(1, (0, common_1.Inject)('SETTING_GUARD_SCHEDULE_REPOSITORY')),
    __metadata("design:paramtypes", [general_service_1.SettingGeneraleService, typeorm_1.Repository])
], SettingGuardScheduleController);
