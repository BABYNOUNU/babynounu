"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthProviders = void 0;
const user_model_1 = require("../user/user.model");
const parent_model_1 = require("../parent/models/parent.model");
const parameter_model_1 = require("../parameter/models/parameter.model");
exports.AuthProviders = [
    {
        provide: 'USER_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(user_model_1.User),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'PARENT_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(parent_model_1.ProfilParents),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'PARAMETER_PROFILE_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(parameter_model_1.Parameter),
        inject: ['DATA_SOURCE'],
    },
];
