"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbonnementModule = void 0;
const common_1 = require("@nestjs/common");
const abonnement_controller_1 = require("./abonnement.controller");
const abonnement_service_1 = require("./abonnement.service");
const database_module_1 = require("../../database/database.module");
const abonnement_1 = require("./abonnement");
const notification_gateway_1 = require("../notification/notification.gateway");
let AbonnementModule = class AbonnementModule {
};
exports.AbonnementModule = AbonnementModule;
exports.AbonnementModule = AbonnementModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [abonnement_controller_1.AbonnementController],
        providers: [abonnement_service_1.AbonnementService, notification_gateway_1.NotificationGateway, ...abonnement_1.AbonnementProviders],
    })
], AbonnementModule);
