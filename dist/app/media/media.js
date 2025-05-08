"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaProviders = void 0;
const media_model_1 = require("./models/media.model");
exports.MediaProviders = [
    {
        provide: 'MEDIA_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(media_model_1.Medias),
        inject: ['DATA_SOURCE'],
    }
];
