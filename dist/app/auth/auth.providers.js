"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthProviders = void 0;
const user_model_1 = require("../user/user.model");
const nounu_model_1 = require("../nounu/models/nounu.model");
const setting_type_profil_model_1 = require("../setting/models/setting_type_profil.model");
const parent_model_1 = require("../parent/models/parent.model");
exports.AuthProviders = [
    {
        provide: 'USER_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(user_model_1.User),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'NOUNU_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(nounu_model_1.Nounus),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'PARENT_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(parent_model_1.Parents),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'TYPE_PROFIL_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(setting_type_profil_model_1.SettingTypeProfil),
        inject: ['DATA_SOURCE'],
    },
];
