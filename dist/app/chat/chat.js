"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatProviders = void 0;
const chat_model_1 = require("./models/chat.model");
exports.ChatProviders = [
    {
        provide: 'CHAT_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(chat_model_1.ChatMessages),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=chat.js.map