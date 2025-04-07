"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomProviders = void 0;
const room_model_1 = require("./models/room.model");
exports.RoomProviders = [
    {
        provide: 'ROOMS_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(room_model_1.Room),
        inject: ['DATA_SOURCE'],
    },
];
