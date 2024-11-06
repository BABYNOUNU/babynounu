"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParentProviders = void 0;
const parent_model_1 = require("./models/parent.model");
exports.ParentProviders = [
    {
        provide: 'PARENT_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(parent_model_1.Parents),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=parent.provider.js.map