"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaiementProviders = void 0;
const paiement_model_1 = require("./models/paiement.model");
exports.PaiementProviders = [
    {
        provide: 'PAYMENT_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(paiement_model_1.Paiements),
        inject: ['DATA_SOURCE'],
    },
];
