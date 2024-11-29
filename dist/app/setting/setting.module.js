"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingModule = void 0;
const common_1 = require("@nestjs/common");
const setting_controller_1 = require("./setting.controller");
const setting_service_1 = require("./setting.service");
const setting_guard_schedule_controller_1 = require("./_partiels/controllers/setting_guard_schedule.controller");
const database_module_1 = require("../../database/database.module");
const general_service_1 = require("./_partiels/general.service");
const setting_1 = require("./setting");
const setting_age_of_children_controller_1 = require("./_partiels/controllers/setting_age_of_children.controller");
const setting_certification_controller_1 = require("./_partiels/controllers/setting_certification.controller");
const setting_children_age_group_controller_1 = require("./_partiels/controllers/setting_children_age_group.controller");
const setting_service_type_controller_1 = require("./_partiels/controllers/setting_service_type.controller");
const setting_language_controller_1 = require("./_partiels/controllers/setting_language.controller");
const setting_specific_need_controller_1 = require("./_partiels/controllers/setting_specific_need.controller");
const setting_localization_controller_1 = require("./_partiels/controllers/setting_localization.controller");
const setting_specific_skill_controller_1 = require("./_partiels/controllers/setting_specific_skill.controller");
const setting_housekeeper_controller_1 = require("./_partiels/controllers/setting_housekeeper.controller");
const setting_desired_time_controller_1 = require("./_partiels/controllers/setting_desired_time.controller");
const setting_service_frequency_controller_1 = require("./_partiels/controllers/setting_service_frequency.controller");
const setting_payment_terms_controller_1 = require("./_partiels/controllers/setting_payment_terms.controller");
let SettingModule = class SettingModule {
};
exports.SettingModule = SettingModule;
exports.SettingModule = SettingModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [
            setting_controller_1.SettingController,
            setting_guard_schedule_controller_1.SettingGuardScheduleController,
            setting_age_of_children_controller_1.SettingAgeOfChildrenController,
            setting_certification_controller_1.SettingCertificationController,
            setting_children_age_group_controller_1.SettingChildrenAgeGroupController,
            setting_service_type_controller_1.SettingServiceTypeController,
            setting_language_controller_1.SettingLanguageController,
            setting_specific_need_controller_1.SettingSpecificNeedController,
            setting_localization_controller_1.SettingLocalizationController,
            setting_specific_skill_controller_1.SettingSpecificSkillController,
            setting_housekeeper_controller_1.SettingHousekeeperController,
            setting_desired_time_controller_1.SettingDesiredTimeController,
            setting_service_type_controller_1.SettingServiceTypeController,
            setting_service_frequency_controller_1.SettingServiceFrequencyController,
            setting_payment_terms_controller_1.SettingPaymentTermsController
        ],
        providers: [setting_service_1.SettingService, ...setting_1.SettingProviders, general_service_1.SettingGeneraleService],
    })
], SettingModule);
