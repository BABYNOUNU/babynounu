"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const user_module_1 = require("./app/user/user.module");
const auth_module_1 = require("./app/auth/auth.module");
const config_1 = require("@nestjs/config");
const parent_module_1 = require("./app/parent/parent.module");
const paiement_module_1 = require("./app/paiement/paiement.module");
const setting_module_1 = require("./app/setting/setting.module");
const notification_module_1 = require("./app/notification/notification.module");
const media_module_1 = require("./app/media/media.module");
const role_module_1 = require("./app/role/role.module");
const abonnement_module_1 = require("./app/abonnement/abonnement.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const job_module_1 = require("./app/job/job.module");
const job_application_module_1 = require("./app/job-application/job-application.module");
const parameter_module_1 = require("./app/parameter/parameter.module");
const nounus_module_1 = require("./app/nounus/nounus.module");
const rooms_module_1 = require("./app/rooms/rooms.module");
const messages_module_1 = require("./app/messages/messages.module");
const chat_module_1 = require("./app/chat/chat.module");
const notification_gateway_1 = require("./app/notification/notification.gateway");
const notification_service_1 = require("./app/notification/notification.service");
const abonnement_service_1 = require("./app/abonnement/abonnement.service");
const notification_1 = require("./app/notification/notification");
const abonnement_1 = require("./app/abonnement/abonnement");
const paiement_1 = require("./app/paiement/paiement");
const paiement_service_1 = require("./app/paiement/paiement.service");
const database_module_1 = require("./database/database.module");
const administrateur_module_1 = require("./app/administrateur/administrateur.module");
const contracts_module_1 = require("./app/contracts/contracts.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'uploads'),
                serveRoot: '/uploads',
            }),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            parent_module_1.ParentModule,
            paiement_module_1.PaiementModule,
            setting_module_1.SettingModule,
            notification_module_1.NotificationModule,
            job_module_1.JobModule,
            media_module_1.MediaModule,
            role_module_1.RoleModule,
            abonnement_module_1.AbonnementModule,
            job_module_1.JobModule,
            job_application_module_1.JobApplicationModule,
            parameter_module_1.ParameterModule,
            nounus_module_1.NounusModule,
            rooms_module_1.RoomsModule,
            messages_module_1.MessagesModule,
            chat_module_1.ChatModule,
            administrateur_module_1.AdministrateurModule,
            contracts_module_1.ContractsModule,
        ],
        controllers: [],
        providers: [
            notification_gateway_1.NotificationGateway,
            notification_service_1.NotificationService,
            abonnement_service_1.AbonnementService,
            paiement_service_1.PaymentService,
            ...paiement_1.PaiementProviders,
            ...notification_1.NotificationProviders,
            ...abonnement_1.AbonnementProviders,
        ],
        exports: [],
    })
], AppModule);
