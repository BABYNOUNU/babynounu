"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleProviders = void 0;
const role_model_1 = require("./models/role.model");
exports.RoleProviders = [
    {
        provide: 'ROLE_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(role_model_1.Roles),
        inject: ['DATA_SOURCE'],
    },
];
