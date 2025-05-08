"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProviders = void 0;
const user_model_1 = require("./user.model");
exports.UserProviders = [
    {
        provide: 'USER_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(user_model_1.User),
        inject: ['DATA_SOURCE'],
    },
];
