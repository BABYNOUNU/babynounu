"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthProviders = void 0;
const user_model_1 = require("../user/user.model");
exports.AuthProviders = [
    {
        provide: 'USER_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(user_model_1.User),
        inject: ['DATA_SOURCE'],
    },
];
