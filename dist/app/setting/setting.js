"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingProviders = void 0;
const setting_guard_schedule_model_1 = require("./models/setting_guard_schedule.model");
const setting_age_of_children_model_1 = require("./models/setting_age_of_children.model");
const setting_certification_model_1 = require("./models/setting_certification.model");
const setting_children_age_group_model_1 = require("./models/setting_children_age_group.model");
const setting_specific_need_model_1 = require("./models/setting_specific_need.model");
const setting_specific_skill_model_1 = require("./models/setting_specific_skill.model");
const setting_language_model_1 = require("./models/setting_language.model");
const setting_localization_model_1 = require("./models/setting_localization.model");
const setting_service_type_model_1 = require("./models/setting_service_type.model");
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
    {
        provide: 'SETTING_CERTIFICATION_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(setting_certification_model_1.SettingCertifications),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'SETTING_CHILDREN_AGE_GROUP_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(setting_children_age_group_model_1.SettingChildrenAgeGroup),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'SETTING_SPECIFIC_NEED_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(setting_specific_need_model_1.SettingSpecificNeed),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'SETTING_SPECIFIC_SKILL_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(setting_specific_skill_model_1.SettingSpecificSkills),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'SETTING_LANGUAGE_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(setting_language_model_1.SettingLanguages),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'SETTING_LOCALIZATION_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(setting_localization_model_1.SettingLocalization),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'SETTING_LOCALIZATION_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(setting_localization_model_1.SettingLocalization),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'SETTING_SERVICE_TYPE_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(setting_service_type_model_1.SettingServiceTypes),
        inject: ['DATA_SOURCE'],
    },
];
