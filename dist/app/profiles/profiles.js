"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileProviders = void 0;
const profile_model_1 = require("./models/profile.model");
const preference_model_1 = require("../Preference/models/preference.model");
const parameter_model_1 = require("../parameter/models/parameter.model");
const user_model_1 = require("../user/user.model");
exports.ProfileProviders = [
    {
        provide: 'PROFILE_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(profile_model_1.Profile),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'USER_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(user_model_1.User),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'PARAMETER_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(parameter_model_1.Parameter),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'PREFERENCE_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(preference_model_1.Preference),
        inject: ['DATA_SOURCE'],
    },
];
