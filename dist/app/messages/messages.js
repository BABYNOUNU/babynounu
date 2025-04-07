"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageProviders = void 0;
const message_model_1 = require("./models/message.model");
exports.MessageProviders = [
    {
        provide: 'MESSAGE_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(message_model_1.Message),
        inject: ['DATA_SOURCE'],
    },
];
