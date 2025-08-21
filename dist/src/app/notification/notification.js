"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationProviders = void 0;
const notification_model_1 = require("./models/notification.model");
exports.NotificationProviders = [
    {
        provide: 'NOTIFICATION_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(notification_model_1.Notification),
        inject: ['DATA_SOURCE'],
    },
];
