"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParameterProviders = void 0;
const parameter_model_1 = require("./models/parameter.model");
exports.ParameterProviders = [
    {
        provide: 'PARAMETER_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(parameter_model_1.Parameter),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'TYPE_PARAMETRE_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(parameter_model_1.Parameter),
        inject: ['DATA_SOURCE'],
    },
];
