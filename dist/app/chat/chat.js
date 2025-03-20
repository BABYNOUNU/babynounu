"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatProviders = void 0;
const rooms_model_1 = require("./models/rooms.model");
const message_model_1 = require("./models/message.model");
exports.ChatProviders = [
    {
        provide: 'MESSAGE_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(message_model_1.Message),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'ROOMS_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(rooms_model_1.Rooms),
        inject: ['DATA_SOURCE'],
    }
];
