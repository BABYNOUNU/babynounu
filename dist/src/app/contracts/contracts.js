"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractsProviders = void 0;
const contracts_model_1 = require("./models/contracts.model");
exports.ContractsProviders = [
    {
        provide: 'CONTRACTS_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(contracts_model_1.Contracts),
        inject: ['DATA_SOURCE'],
    },
];
