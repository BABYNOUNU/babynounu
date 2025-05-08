"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomProviders = void 0;
const room_model_1 = require("./models/room.model");
const unreadCount_model_1 = require("./models/unreadCount.model");
exports.RoomProviders = [
    {
        provide: 'ROOMS_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(room_model_1.Rooms),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'UNREAD_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(unreadCount_model_1.RoomMessageCount),
        inject: ['DATA_SOURCE'],
    },
];
