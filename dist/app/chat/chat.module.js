"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModule = void 0;
const common_1 = require("@nestjs/common");
const chat_controller_1 = require("./chat.controller");
const chat_service_1 = require("./chat.service");
const chat_gateway_1 = require("./chat.gateway");
const rooms_service_1 = require("../rooms/rooms.service");
const user_service_1 = require("../user/user.service");
const messages_service_1 = require("../messages/messages.service");
const database_module_1 = require("../../database/database.module");
const rooms_1 = require("../rooms/rooms");
const messages_1 = require("../messages/messages");
const user_providers_1 = require("../user/user.providers");
const auth_service_1 = require("../auth/auth.service");
const abonnement_service_1 = require("../abonnement/abonnement.service");
const role_1 = require("../role/role");
const parameter_1 = require("../parameter/parameter");
const auth_providers_1 = require("../auth/auth.providers");
const abonnement_1 = require("../abonnement/abonnement");
const paiement_1 = require("../paiement/paiement");
const paiement_service_1 = require("../paiement/paiement.service");
const notification_service_1 = require("../notification/notification.service");
const notification_1 = require("../notification/notification");
const contracts_service_1 = require("../contracts/contracts.service");
const contracts_1 = require("../contracts/contracts");
const nounus_1 = require("../nounus/nounus");
let ChatModule = class ChatModule {
};
exports.ChatModule = ChatModule;
exports.ChatModule = ChatModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [chat_controller_1.ChatController],
        providers: [
            chat_service_1.ChatService,
            chat_gateway_1.ChatGateway,
            rooms_service_1.RoomsService,
            messages_service_1.MessageService,
            user_service_1.UserService,
            auth_service_1.AuthService,
            abonnement_service_1.AbonnementService,
            paiement_service_1.PaymentService,
            notification_service_1.NotificationService,
            contracts_service_1.ContractsService,
            ...contracts_1.ContractsProviders,
            ...nounus_1.NounusProviders,
            ...paiement_1.PaiementProviders,
            ...notification_1.NotificationProviders,
            ...abonnement_1.AbonnementProviders,
            ...paiement_1.PaiementProviders,
            ...auth_providers_1.AuthProviders,
            ...parameter_1.ParameterProviders,
            ...role_1.RoleProviders,
            ...rooms_1.RoomProviders,
            ...messages_1.MessageProviders,
            ...user_providers_1.UserProviders,
        ],
    })
], ChatModule);
