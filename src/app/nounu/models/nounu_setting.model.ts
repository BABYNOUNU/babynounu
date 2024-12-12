import { Parents } from 'src/app/parent/models/parent.model';
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SettingAgeOfChildren } from '../../setting/models/setting_age_of_children.model';
import { SettingGuardSchedules } from '../../setting/models/setting_guard_schedule.model';
import { SettingSpecificNeed } from '../../setting/models/setting_specific_need.model';
import { SettingSpecificSkills } from '../../setting/models/setting_specific_skill.model';
import { SettingLanguages } from '../../setting/models/setting_language.model';
import { SettingLocalization } from '../../setting/models/setting_localization.model';
import { Nounus } from './nounu.model';
import { SettingCertifications } from 'src/app/setting/models/setting_certification.model';

@Entity()
export class NounuSettings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @OneToMany(() => Nounus, (nounu) => nounu.setting, { cascade: true, onDelete: 'CASCADE' })
  // nounu: Nounus;

  // @ManyToOne(() => SettingLanguages, (SN) => SN.nounu, {
  //   cascade: true, onDelete: 'CASCADE',
  // })
  // language: SettingLanguages;

  // @ManyToOne(() => SettingAgeOfChildren, (AOC) => AOC.nounu, {
  //   cascade: true, onDelete: 'CASCADE',
  // })
  // specific_skills: SettingSpecificSkills;

  // @ManyToOne(() => SettingGuardSchedules, (AOC) => AOC.nounu, {
  //   cascade: true, onDelete: 'CASCADE',
  // })
  // guard_schedule: SettingGuardSchedules[];

  // @ManyToOne(() => SettingLocalization, (SN) => SN.nounu, {
  //   cascade: true, onDelete: 'CASCADE',
  // })
  // localization: SettingLocalization[];

  // @ManyToOne(() => SettingCertifications, (SC) => SC.nounu, {
  //   cascade: true, onDelete: 'CASCADE',
  // })
  // certification?: SettingCertifications[];
}
