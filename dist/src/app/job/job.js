"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobProviders = void 0;
const job_model_1 = require("./models/job.model");
const preference_model_1 = require("../Preference/models/preference.model");
exports.JobProviders = [
    {
        provide: 'JOB_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(job_model_1.Job),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'PREFERENCE_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(preference_model_1.Preference),
        inject: ['DATA_SOURCE'],
    },
];
