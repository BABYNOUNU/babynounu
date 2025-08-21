"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModule = void 0;
const common_1 = require("@nestjs/common");
const notification_controller_1 = require("./notification.controller");
const notification_service_1 = require("./notification.service");
const notification_1 = require("./notification");
const database_module_1 = require("../../database/database.module");
const abonnement_service_1 = require("../abonnement/abonnement.service");
const abonnement_1 = require("../abonnement/abonnement");
const paiement_1 = require("../paiement/paiement");
const paiement_service_1 = require("../paiement/paiement.service");
const nounus_service_1 = require("../nounus/nounus.service");
const nounus_1 = require("../nounus/nounus");
const media_service_1 = require("../media/media.service");
const media_1 = require("../media/media");
const preference_1 = require("../Preference/preference");
const parameter_1 = require("../parameter/parameter");
const parameter_service_1 = require("../parameter/parameter.service");
let NotificationModule = class NotificationModule {
};
exports.NotificationModule = NotificationModule;
exports.NotificationModule = NotificationModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [notification_controller_1.NotificationController],
        providers: [
            notification_service_1.NotificationService,
            paiement_service_1.PaymentService,
            abonnement_service_1.AbonnementService,
            nounus_service_1.NounusService,
            media_service_1.MediaService,
            parameter_service_1.ParameterService,
            ...parameter_1.ParameterProviders,
            ...media_1.MediaProviders,
            ...preference_1.PreferenceProvider,
            ...nounus_1.NounusProviders,
            ...abonnement_1.AbonnementProviders,
            ...paiement_1.PaiementProviders,
            ...notification_1.NotificationProviders,
        ],
    })
], NotificationModule);
