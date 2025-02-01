"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbonnementProviders = void 0;
const abonnement_model_1 = require("./models/abonnement.model");
const paiement_model_1 = require("../paiement/models/paiement.model");
const notification_model_1 = require("../notification/models/notification.model");
exports.AbonnementProviders = [
    {
        provide: 'ABONNEMENT_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(abonnement_model_1.Abonnements),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'PAYMENT_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(paiement_model_1.Paiements),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'NOTIFICATION_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(notification_model_1.Notification),
        inject: ['DATA_SOURCE'],
    },
];
