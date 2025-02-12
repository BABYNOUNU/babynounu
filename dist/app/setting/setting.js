"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingProviders = void 0;
const role_model_1 = require("../role/models/role.model");
const parameter_type_model_1 = require("../parameter/models/parameter_type.model");
const parameter_model_1 = require("../parameter/models/parameter.model");
const abonnement_model_1 = require("../abonnement/models/abonnement.model");
const notification_model_1 = require("../notification/models/notification.model");
exports.SettingProviders = [
    {
        provide: 'ROLE_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(role_model_1.Roles),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'TYPE_PARAMETER_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(parameter_type_model_1.TypeParameter),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'PARAMETER_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(parameter_model_1.Parameter),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'ABONNEMENT_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(abonnement_model_1.Abonnements),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'NOTIFICATION_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(notification_model_1.Notification),
        inject: ['DATA_SOURCE'],
    }
];
