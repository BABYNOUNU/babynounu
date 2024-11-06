"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingProviders = void 0;
const setting_guard_schedule_model_1 = require("./models/setting_guard_schedule.model");
exports.SettingProviders = [
    {
        provide: 'SETTING_GUARD_SCHEDULE_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(setting_guard_schedule_model_1.SettingGuardSchedules),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=setting.js.map