"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbonnementProviders = void 0;
const abonnement_model_1 = require("./models/abonnement.model");
exports.AbonnementProviders = [
    {
        provide: 'ABONNEMENT_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(abonnement_model_1.Abonnements),
        inject: ['DATA_SOURCE'],
    },
];
