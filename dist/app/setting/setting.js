"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingProviders = void 0;
const setting_guard_schedule_model_1 = require("./models/setting_guard_schedule.model");
const setting_age_of_children_model_1 = require("./models/setting_age_of_children.model");
exports.SettingProviders = [
    {
        provide: 'SETTING_GUARD_SCHEDULE_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(setting_guard_schedule_model_1.SettingGuardSchedules),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'SETTING_AGE_OF_CHILDREN_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(setting_age_of_children_model_1.SettingAgeOfChildren),
        inject: ['DATA_SOURCE'],
    },
];
