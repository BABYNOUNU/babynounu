"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParentModule = void 0;
const common_1 = require("@nestjs/common");
const parent_controller_1 = require("./parent.controller");
const parent_service_1 = require("./parent.service");
const parent_provider_1 = require("./parent.provider");
const database_module_1 = require("../../database/database.module");
const media_service_1 = require("../media/media.service");
const parameter_service_1 = require("../parameter/parameter.service");
const nounus_service_1 = require("../nounus/nounus.service");
const preference_1 = require("../Preference/preference");
const media_1 = require("../media/media");
const parameter_1 = require("../parameter/parameter");
const nounus_1 = require("../nounus/nounus");
const notification_1 = require("../notification/notification");
const notification_service_1 = require("../notification/notification.service");
let ParentModule = class ParentModule {
};
exports.ParentModule = ParentModule;
exports.ParentModule = ParentModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [parent_controller_1.ParentController],
        providers: [
            parent_service_1.ParentsService,
            media_service_1.MediaService,
            parameter_service_1.ParameterService,
            nounus_service_1.NounusService,
            notification_service_1.NotificationService,
            ...notification_1.NotificationProviders,
            ...parent_provider_1.ParentProviders,
            ...media_1.MediaProviders,
            ...preference_1.PreferenceProvider,
            ...parameter_1.ParameterProviders,
            ...nounus_1.NounusProviders
        ],
    })
], ParentModule);
