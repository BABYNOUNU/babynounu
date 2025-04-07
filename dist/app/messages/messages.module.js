"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesModule = void 0;
const common_1 = require("@nestjs/common");
const messages_controller_1 = require("./messages.controller");
const messages_service_1 = require("./messages.service");
const messages_1 = require("./messages");
const database_module_1 = require("../../database/database.module");
const rooms_1 = require("../rooms/rooms");
let MessagesModule = class MessagesModule {
};
exports.MessagesModule = MessagesModule;
exports.MessagesModule = MessagesModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [messages_controller_1.MessageController],
        providers: [messages_service_1.MessageService, ...messages_1.MessageProviders, ...rooms_1.RoomProviders]
    })
], MessagesModule);
