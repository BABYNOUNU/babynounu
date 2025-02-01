"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobApplicationProviders = void 0;
const job_model_1 = require("../job/models/job.model");
const job_application_model_1 = require("./models/job-application.model");
const user_model_1 = require("../user/user.model");
const notification_model_1 = require("../notification/models/notification.model");
exports.JobApplicationProviders = [
    {
        provide: 'JOB_APPLICATION_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(job_application_model_1.JobApplication),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'JOB_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(job_model_1.Job),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'USER_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(user_model_1.User),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'NOTIFICATION_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(notification_model_1.Notification),
        inject: ['DATA_SOURCE'],
    }
];
