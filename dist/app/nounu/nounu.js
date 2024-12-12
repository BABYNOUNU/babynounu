"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NounuProviders = void 0;
const nounu_setting_model_1 = require("./models/nounu_setting.model");
const nounu_model_1 = require("./models/nounu.model");
const setting_language_model_1 = require("../setting/models/setting_language.model");
const nounu_setting_languages_model_1 = require("./models/nounu_setting_languages.model");
const nounu_setting_certification_model_1 = require("./models/nounu_setting_certification.model");
const nounu_setting_age_of_children_model_1 = require("./models/nounu_setting_age_of_children.model");
const nounu_setting_localization_model_1 = require("./models/nounu_setting_localization.model");
const nounu_settring_area_work_model_1 = require("./models/nounu_settring_area_work.model");
const nounu_setting_desired_time_model_1 = require("./models/nounu_setting_desired_time.model");
const setting_age_of_children_model_1 = require("../setting/models/setting_age_of_children.model");
const setting_localization_model_1 = require("../setting/models/setting_localization.model");
const setting_certification_model_1 = require("../setting/models/setting_certification.model");
const user_model_1 = require("../user/user.model");
const setting_desired_time_model_1 = require("../setting/models/setting_desired_time.model");
const setting_specific_skill_model_1 = require("../setting/models/setting_specific_skill.model");
const media_model_1 = require("../media/models/media.model");
const nounu_settring_specific_skill_model_1 = require("./models/nounu_settring_specific_skill.model");
exports.NounuProviders = [
    {
        provide: 'NOUNU_SETTING_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(nounu_setting_model_1.NounuSettings),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'NOUNU_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(nounu_model_1.Nounus),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'SEETING_LANGUAGE_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(setting_language_model_1.SettingLanguages),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'NOUNU_SEETING_LANGUAGE_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(nounu_setting_languages_model_1.NounuSettingLanguages),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'NOUNU_SETTING_LOCALIZATION_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(nounu_setting_localization_model_1.NounuSettingLocalizations),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'NOUNU_SETTING_AGE_OF_CHILDRENS_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(nounu_setting_age_of_children_model_1.NounuSettingAgeOfChildrens),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'NOUNU_SETTING_CERTIFICATION_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(nounu_setting_certification_model_1.NounuSettingCertifications),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'NOUNU_SETTING_DESIREDTIMES_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(nounu_setting_desired_time_model_1.NounuSettingDeriredTimes),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'NOUNU_SETTING_AREA_WORK_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(nounu_settring_area_work_model_1.NounuSettingAreaWork),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'SETTING_AGE_OF_CHILDRENS_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(setting_age_of_children_model_1.SettingAgeOfChildren),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'SETTING_LOCALIZATION_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(setting_localization_model_1.SettingLocalization),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'SETTING_CERTIFICATION_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(setting_certification_model_1.SettingCertifications),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'SETTING_DESIRED_TIME_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(setting_desired_time_model_1.SettingDesiredTime),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'SETTING_SPECIFIC_SKILLS_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(setting_specific_skill_model_1.SettingSpecificSkills),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'USER_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(user_model_1.User),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'NOUNU_SETTING_SPECIFIC_SKILLS_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(nounu_settring_specific_skill_model_1.NounuSettingSpecificSkills),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'MEDIA_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(media_model_1.Medias),
        inject: ['DATA_SOURCE'],
    },
];
