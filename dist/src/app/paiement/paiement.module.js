"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaiementModule = void 0;
const common_1 = require("@nestjs/common");
const paiement_controller_1 = require("./paiement.controller");
const paiement_service_1 = require("./paiement.service");
const paiement_1 = require("./paiement");
const database_module_1 = require("../../database/database.module");
const notification_service_1 = require("../notification/notification.service");
const notification_1 = require("../notification/notification");
const abonnement_service_1 = require("../abonnement/abonnement.service");
const abonnement_1 = require("../abonnement/abonnement");
const nounus_1 = require("../nounus/nounus");
const nounus_service_1 = require("../nounus/nounus.service");
const preference_1 = require("../Preference/preference");
const media_service_1 = require("../media/media.service");
const media_1 = require("../media/media");
const parameter_service_1 = require("../parameter/parameter.service");
const parameter_1 = require("../parameter/parameter");
let PaiementModule = class PaiementModule {
};
exports.PaiementModule = PaiementModule;
exports.PaiementModule = PaiementModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [paiement_controller_1.PaymentController],
        providers: [
            paiement_service_1.PaymentService,
            abonnement_service_1.AbonnementService,
            notification_service_1.NotificationService,
            nounus_service_1.NounusService,
            media_service_1.MediaService,
            parameter_service_1.ParameterService,
            ...parameter_1.ParameterProviders,
            ...media_1.MediaProviders,
            ...preference_1.PreferenceProvider,
            ...nounus_1.NounusProviders,
            ...abonnement_1.AbonnementProviders,
            ...notification_1.NotificationProviders,
            ...paiement_1.PaiementProviders
        ],
    })
], PaiementModule);
