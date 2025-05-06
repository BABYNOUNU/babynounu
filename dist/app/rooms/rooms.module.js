"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomsModule = void 0;
const common_1 = require("@nestjs/common");
const rooms_controller_1 = require("./rooms.controller");
const rooms_service_1 = require("./rooms.service");
const rooms_1 = require("./rooms");
const database_module_1 = require("../../database/database.module");
const user_service_1 = require("../user/user.service");
const user_providers_1 = require("../user/user.providers");
const messages_service_1 = require("../messages/messages.service");
const messages_1 = require("../messages/messages");
const notification_service_1 = require("../notification/notification.service");
const notification_1 = require("../notification/notification");
const contracts_1 = require("../contracts/contracts");
const contracts_service_1 = require("../contracts/contracts.service");
const nounus_1 = require("../nounus/nounus");
const parent_1 = require("../parent/parent");
const nounus_service_1 = require("../nounus/nounus.service");
const parameter_service_1 = require("../parameter/parameter.service");
const media_service_1 = require("../media/media.service");
const parameter_1 = require("../parameter/parameter");
const media_1 = require("../media/media");
const preference_1 = require("../Preference/preference");
let RoomsModule = class RoomsModule {
};
exports.RoomsModule = RoomsModule;
exports.RoomsModule = RoomsModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [rooms_controller_1.RoomsController],
        providers: [
            rooms_service_1.RoomsService,
            user_service_1.UserService,
            messages_service_1.MessageService,
            notification_service_1.NotificationService,
            contracts_service_1.ContractsService,
            nounus_service_1.NounusService,
            media_service_1.MediaService,
            parameter_service_1.ParameterService,
            ...parameter_1.ParameterProviders,
            ...media_1.MediaProviders,
            ...preference_1.PreferenceProvider,
            ...nounus_1.NounusProviders,
            ...contracts_1.ContractsProviders,
            ...nounus_1.NounusProviders,
            ...parent_1.ParentProviders,
            ...notification_1.NotificationProviders,
            ...messages_1.MessageProviders,
            ...rooms_1.RoomProviders,
            ...user_providers_1.UserProviders,
        ],
    })
], RoomsModule);
