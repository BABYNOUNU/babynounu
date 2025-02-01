"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobProviders = void 0;
const job_model_1 = require("./models/job.model");
const setting_desired_time_model_1 = require("../setting/models/setting_desired_time.model");
const setting_service_frequency_model_1 = require("../setting/models/setting_service_frequency.model");
exports.JobProviders = [
    {
        provide: 'JOB_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(job_model_1.Job),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'SETTING_DESIRED_TIME_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(setting_desired_time_model_1.SettingDesiredTime),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'SETTING_SERVICE_FREQUENCY_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(setting_service_frequency_model_1.SettingServiceFrequency),
        inject: ['DATA_SOURCE'],
    },
];
