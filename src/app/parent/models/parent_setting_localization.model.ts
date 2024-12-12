import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SettingAgeOfChildren } from '../../setting/models/setting_age_of_children.model';
import { SettingGuardSchedules } from '../../setting/models/setting_guard_schedule.model';
import { SettingSpecificNeed } from '../../setting/models/setting_specific_need.model';
import { SettingSpecificSkills } from '../../setting/models/setting_specific_skill.model';
import { SettingLanguages } from '../../setting/models/setting_language.model';
import { SettingLocalization } from '../../setting/models/setting_localization.model';
import { Parents } from './parent.model';
import { SettingCertifications } from 'src/app/setting/models/setting_certification.model';

@Entity()
export class ParentSettingLocalizations{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Parents, (parent) => parent.settingLocalizations, { onDelete: 'CASCADE' })
  parent: Parents;

  @ManyToOne(() => SettingLocalization, { onDelete: 'CASCADE' })
  loacalization: SettingLocalization;
}
