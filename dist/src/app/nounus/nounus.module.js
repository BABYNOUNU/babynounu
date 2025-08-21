"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NounusModule = void 0;
const media_service_1 = require("./../media/media.service");
const common_1 = require("@nestjs/common");
const nounus_controller_1 = require("./nounus.controller");
const nounus_service_1 = require("./nounus.service");
const nounus_1 = require("./nounus");
const database_module_1 = require("../../database/database.module");
const parameter_service_1 = require("../parameter/parameter.service");
const parent_service_1 = require("../parent/parent.service");
const preference_1 = require("../Preference/preference");
const parent_provider_1 = require("../parent/parent.provider");
const media_1 = require("../media/media");
const parameter_1 = require("../parameter/parameter");
const notification_service_1 = require("../notification/notification.service");
const notification_1 = require("../notification/notification");
let NounusModule = class NounusModule {
};
exports.NounusModule = NounusModule;
exports.NounusModule = NounusModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [nounus_controller_1.NounusController],
        providers: [
            nounus_service_1.NounusService,
            parent_service_1.ParentsService,
            parameter_service_1.ParameterService,
            media_service_1.MediaService,
            notification_service_1.NotificationService,
            ...notification_1.NotificationProviders,
            ...parent_provider_1.ParentProviders,
            ...parameter_1.ParameterProviders,
            ...preference_1.PreferenceProvider,
            ...media_1.MediaProviders,
            ...nounus_1.NounusProviders,
        ],
    })
], NounusModule);
