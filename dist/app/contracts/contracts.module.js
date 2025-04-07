"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractsModule = void 0;
const common_1 = require("@nestjs/common");
const contracts_controller_1 = require("./contracts.controller");
const contracts_service_1 = require("./contracts.service");
const contracts_1 = require("./contracts");
const database_module_1 = require("../../database/database.module");
const parent_1 = require("../parent/parent");
const nounus_1 = require("../nounus/nounus");
const notification_service_1 = require("../notification/notification.service");
const notification_1 = require("../notification/notification");
let ContractsModule = class ContractsModule {
};
exports.ContractsModule = ContractsModule;
exports.ContractsModule = ContractsModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [contracts_controller_1.ContractsController],
        providers: [
            contracts_service_1.ContractsService,
            notification_service_1.NotificationService,
            ...contracts_1.ContractsProviders,
            ...parent_1.ParentProviders,
            ...nounus_1.NounusProviders,
            ...notification_1.NotificationProviders
        ],
    })
], ContractsModule);
