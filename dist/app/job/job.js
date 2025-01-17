"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobProviders = void 0;
const job_model_1 = require("./models/job.model");
exports.JobProviders = [
    {
        provide: 'JOB_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(job_model_1.Job),
        inject: ['DATA_SOURCE'],
    },
];
