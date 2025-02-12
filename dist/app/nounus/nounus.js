"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NounusProviders = void 0;
const nounu_model_1 = require("./models/nounu.model");
exports.NounusProviders = [
    {
        provide: 'NOUNUS_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(nounu_model_1.Nounus),
        inject: ['DATA_SOURCE'],
    },
];
