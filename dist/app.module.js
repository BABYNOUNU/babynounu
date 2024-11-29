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
const nounu_module_1 = require("./app/nounu/nounu.module");
const setting_module_1 = require("./app/setting/setting.module");
const chat_module_1 = require("./app/chat/chat.module");
const notification_module_1 = require("./app/notification/notification.module");
const media_module_1 = require("./app/media/media.module");
const role_module_1 = require("./app/role/role.module");
const abonnement_module_1 = require("./app/abonnement/abonnement.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
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
            nounu_module_1.NounuModule,
            setting_module_1.SettingModule,
            chat_module_1.ChatModule,
            notification_module_1.NotificationModule,
            media_module_1.MediaModule,
            role_module_1.RoleModule,
            abonnement_module_1.AbonnementModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
