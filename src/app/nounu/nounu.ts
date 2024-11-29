import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { NounuSettings } from './models/nounu_setting.model';
import { Nounus } from './models/nounu.model';
import { SettingLanguages } from '../setting/models/setting_language.model';
import { NounuSettingLanguages } from './models/nounu_setting_languages.model';
import { NounuSettingCertifications } from './models/nounu_setting_certification.model';
import { NounuSettingAgeOfChildrens } from './models/nounu_setting_age_of_children.model';
import { NounuSettingLocalizations } from './models/nounu_setting_localization.model';
import { NounuSettingAreaWork } from './models/nounu_settring_area_work.model';
import { NounuSettingDeriredTimes } from './models/nounu_setting_desired_time.model';
import { SettingAgeOfChildren } from '../setting/models/setting_age_of_children.model';
import { SettingLocalization } from '../setting/models/setting_localization.model';
import { SettingCertifications } from '../setting/models/setting_certification.model';
import { User } from '../user/user.model';
import { SettingDesiredTime } from '../setting/models/setting_desired_time.model';
import { SettingSpecificSkills } from '../setting/models/setting_specific_skill.model';

export const NounuProviders = [
    {
      provide: 'NOUNU_SETTING_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(NounuSettings),
      inject: ['DATA_SOURCE'],
    },
    {
        provide: 'NOUNU_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Nounus),
        inject: ['DATA_SOURCE'],
      },
      {
        provide: 'SEETING_LANGUAGE_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(SettingLanguages),
        inject: ['DATA_SOURCE'],
      },
      {
        provide: 'NOUNU_SEETING_LANGUAGE_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(NounuSettingLanguages),
        inject: ['DATA_SOURCE'],
      },
      {
        provide: 'NOUNU_SETTING_LOCALIZATION_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(NounuSettingLocalizations),
        inject: ['DATA_SOURCE'],
      },
      {
        provide: 'NOUNU_SETTING_AGE_OF_CHILDRENS_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(NounuSettingAgeOfChildrens),
        inject: ['DATA_SOURCE'],
      },
      {
        provide: 'NOUNU_SETTING_CERTIFICATION_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(NounuSettingCertifications),
        inject: ['DATA_SOURCE'],
      },
      {
        provide: 'NOUNU_SETTING_DESIREDTIMES_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(NounuSettingDeriredTimes),
        inject: ['DATA_SOURCE'],
      },
      {
        provide: 'NOUNU_SETTING_AREA_WORK_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(NounuSettingAreaWork),
        inject: ['DATA_SOURCE'],
      },
{
  provide: 'SETTING_AGE_OF_CHILDRENS_REPOSITORY',
  useFactory: (dataSource: DataSource) => dataSource.getRepository(SettingAgeOfChildren),
  inject: ['DATA_SOURCE'],
},
{
  provide: 'SETTING_LOCALIZATION_REPOSITORY',
  useFactory: (dataSource: DataSource) => dataSource.getRepository(SettingLocalization),
  inject: ['DATA_SOURCE'],
},
{
  provide: 'SETTING_CERTIFICATION_REPOSITORY',
  useFactory: (dataSource: DataSource) => dataSource.getRepository(SettingCertifications),
  inject: ['DATA_SOURCE'],
},
{
  provide: 'SETTING_DESIRED_TIME_REPOSITORY',
  useFactory: (dataSource: DataSource) => dataSource.getRepository(SettingDesiredTime),
  inject: ['DATA_SOURCE'],
},
{
  provide: 'SETTING_SPECIFIC_SKILLS_REPOSITORY',
  useFactory: (dataSource: DataSource) => dataSource.getRepository(SettingSpecificSkills),
  inject: ['DATA_SOURCE'],
},
{
  provide: 'USER_REPOSITORY',
  useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
  inject: ['DATA_SOURCE'],
},

{
  provide: 'NOUNU_SETTING_SPECIFIC_SKILLS_REPOSITORY',
  useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
  inject: ['DATA_SOURCE'],
},


  ];
