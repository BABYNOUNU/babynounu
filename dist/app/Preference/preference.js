"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreferenceProvider = void 0;
const preference_model_1 = require("./models/preference.model");
exports.PreferenceProvider = [
    {
        provide: 'PREFERENCE_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(preference_model_1.Preference),
        inject: ['DATA_SOURCE']
    }
];
