"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdministrateurModule = void 0;
const common_1 = require("@nestjs/common");
const administrateur_controller_1 = require("./administrateur.controller");
const administrateur_service_1 = require("./administrateur.service");
const administrateur_1 = require("./administrateur");
let AdministrateurModule = class AdministrateurModule {
};
exports.AdministrateurModule = AdministrateurModule;
exports.AdministrateurModule = AdministrateurModule = __decorate([
    (0, common_1.Module)({
        controllers: [administrateur_controller_1.AdministrateurController],
        providers: [administrateur_service_1.AdministrateurService, administrateur_1.Administrateur]
    })
], AdministrateurModule);
