"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParentProviders = void 0;
const media_model_1 = require("../media/models/media.model");
const user_model_1 = require("../user/user.model");
exports.ParentProviders = [
    {
        provide: 'USER_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(user_model_1.User),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'MEDIA_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(media_model_1.Medias),
        inject: ['DATA_SOURCE'],
    }
];
