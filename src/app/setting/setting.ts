import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { SettingGuardSchedules } from './models/setting_guard_schedule.model';
import { SettingAgeOfChildren } from './models/setting_age_of_children.model';
import { SettingCertifications } from './models/setting_certification.model';
import { SettingChildrenAgeGroup } from './models/setting_children_age_group.model';
import { SettingSpecificNeed } from './models/setting_specific_need.model';
import { SettingSpecificSkills } from './models/setting_specific_skill.model';
import { SettingLanguages } from './models/setting_language.model';
import { SettingLocalization } from './models/setting_localization.model';
import { SettingServiceTypes } from './models/setting_service_type.model';


export const SettingProviders = [
    {
      provide: 'SETTING_GUARD_SCHEDULE_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(SettingGuardSchedules),
      inject: ['DATA_SOURCE'],
    },
    {
      provide: 'SETTING_AGE_OF_CHILDREN_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(SettingAgeOfChildren),
      inject: ['DATA_SOURCE'],
    },
    {
      provide: 'SETTING_CERTIFICATION_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(SettingCertifications),
      inject: ['DATA_SOURCE'],
    },
    {
      provide: 'SETTING_CHILDREN_AGE_GROUP_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(SettingChildrenAgeGroup),
      inject: ['DATA_SOURCE'],
    },
    {
      provide: 'SETTING_SPECIFIC_NEED_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(SettingSpecificNeed),
      inject: ['DATA_SOURCE'],
    },
    {
      provide: 'SETTING_SPECIFIC_SKILL_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(SettingSpecificSkills),
      inject: ['DATA_SOURCE'],
    },
    {
      provide: 'SETTING_LANGUAGE_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(SettingLanguages),
      inject: ['DATA_SOURCE'],
    },
    {
      provide: 'SETTING_LOCALIZATION_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(SettingLocalization),
      inject: ['DATA_SOURCE'],
    },
    {
      provide: 'SETTING_LOCALIZATION_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(SettingLocalization),
      inject: ['DATA_SOURCE'],
    },
    {
      provide: 'SETTING_SERVICE_TYPE_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(SettingServiceTypes),
      inject: ['DATA_SOURCE'],
    },
  ];
