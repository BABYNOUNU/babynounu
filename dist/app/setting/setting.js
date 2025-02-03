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
const setting_housekeeper_model_1 = require("./models/setting_housekeeper.model");
const setting_service_frequency_model_1 = require("./models/setting_service_frequency.model");
const setting_desired_time_model_1 = require("./models/setting_desired_time.model");
const setting_payment_terms_model_1 = require("./models/setting_payment_terms.model");
const role_model_1 = require("../role/models/role.model");
const setting_type_profil_model_1 = require("./models/setting_type_profil.model");
const setting_subscription_type_model_1 = require("./models/setting_subscription_type.model");
const parameter_type_model_1 = require("../parameter/models/parameter_type.model");
const parameter_model_1 = require("../parameter/models/parameter.model");
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
    {
        provide: 'SETTING_HOUSEKEEPER_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(setting_housekeeper_model_1.SettingHousekeeper),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'SETTING_SERVICE_FREQUENCY_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(setting_service_frequency_model_1.SettingServiceFrequency),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'SETTING_DESIRE_TIMES_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(setting_desired_time_model_1.SettingDesiredTime),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'SETTING_PAYMENT_TERMS_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(setting_payment_terms_model_1.SettingPaymentTerms),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'SETTING_PAYMENT_TERMS_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(setting_payment_terms_model_1.SettingPaymentTerms),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'ROLE_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(role_model_1.Roles),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'TYPE_PROFIL_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(setting_type_profil_model_1.SettingTypeProfil),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'TYPE_PAIEMENT_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(setting_subscription_type_model_1.settingSubscriptionTypes),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'TYPE_PARAMETER_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(parameter_type_model_1.TypeParameter),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'PARAMETER_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(parameter_model_1.Parameter),
        inject: ['DATA_SOURCE'],
    }
];
