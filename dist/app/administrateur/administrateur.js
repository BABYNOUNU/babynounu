"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdministrateurProviders = void 0;
const updateApp_model_1 = require("./models/updateApp.model");
exports.AdministrateurProviders = [
    {
        provide: 'ADMINISTRATEUR_APP_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(updateApp_model_1.UpdateApp),
        inject: ['DATA_SOURCE'],
    },
];
