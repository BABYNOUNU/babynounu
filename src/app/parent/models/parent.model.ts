import { SettingServiceFrequency } from './../../setting/models/setting_service_frequency.model';
import { SettingHousekeeper } from './../../setting/models/setting_housekeeper.model';
import { Medias } from 'src/app/media/models/media.model';
import { SettingAgeOfChildren } from 'src/app/setting/models/setting_age_of_children.model';
import { SettingGuardSchedules } from 'src/app/setting/models/setting_guard_schedule.model';
import { SettingSpecificNeed } from 'src/app/setting/models/setting_specific_need.model';
import { User } from 'src/app/user/user.model';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ParentSettingAgeOfChildrens } from './parent_setting_age_of_children.model';
import { ParentSettingDeriredTimes } from './parent_setting_desired_time.model';
import { ParentSettingLanguages } from './parent_setting_languages.model';
import { ParentSettingLocalizations } from './parent_setting_localization.model';
import { ParentSettingSpecificSkills } from 'src/app/parent/models/parent_settring_specific_skill.model';
import { ParentSettingGuardSchedules } from './parent_setting_guard_schedules.model';
import { ParentSettingSpecificNeeds } from './parent_setting_specific_need.model';
import { ParentSettingAreaWork } from './parent_settring_area_work.model';
import { ParentSettingHousekeepers } from './parent_setting_housekeeper.model';
import { ParentSettingServiceFrequency } from './parent_setting_service_frequency.model';

@Entity()
export class Parents {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, unique: false, nullable: true })
  fullname: string;

  @Column('varchar', { length: 255, unique: false, nullable: false })
  phone: string;

  @Column('varchar', { length: 255, unique: false, nullable: false })
  adresse: string;

  @Column({ type: 'varchar', length: 255, unique: false, nullable: false })
  budget_min: string;

  @Column({ type: 'varchar', length: 255, unique: false, nullable: false })
  budget_max: string;

  @Column({ type: 'text', nullable: false })
  photo: string;

  @Column('varchar', { length: 255,  nullable: false })
  number_of_children: string;

  @Column('varchar', { length: 255,  nullable: false })
  localization: string;

  @Column({ type: 'varchar', length: 255, unique: false, nullable: false })
  payment_terms: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 255, unique: false, nullable: false })
  availabilityServiceProvider: string; 

  @OneToOne((type) => User, (user) => user.parent, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => ParentSettingAgeOfChildrens, (SN) => SN.parent, { cascade: true, onDelete: 'CASCADE' })
  settingAgeOfChildrens: ParentSettingAgeOfChildrens[];

  @OneToMany(() => ParentSettingSpecificNeeds, (SN) => SN.parent, { cascade: true, onDelete: 'CASCADE' })
  settingSpecificNeeds: ParentSettingSpecificNeeds[];

  @OneToMany(() => ParentSettingGuardSchedules, (SN) => SN.parent, { cascade: true, onDelete: 'CASCADE' })
  settingGuardSchedules: ParentSettingGuardSchedules[];

  @OneToMany(() => ParentSettingDeriredTimes, (SN) => SN.parent, { cascade: true, onDelete: 'CASCADE' })
  settingDesiredTimes: ParentSettingDeriredTimes[];

  @OneToMany(() => ParentSettingHousekeepers, (SN) => SN.parent, { cascade: true, onDelete: 'CASCADE' })
  settingHousekeepers: ParentSettingHousekeepers[];

  @OneToMany(() => ParentSettingAreaWork, (SN) => SN.parent, { cascade: true, onDelete: 'CASCADE' })
  settingAreaWorks: ParentSettingAreaWork[];

  @OneToMany(() => ParentSettingLanguages, (SN) => SN.parent, { cascade: true, onDelete: 'CASCADE' })
  settingLanguages: ParentSettingLanguages[];

  @OneToMany(() => ParentSettingLocalizations, (SN) => SN.parent, { cascade: true, onDelete: 'CASCADE' })
  settingLocalizations: ParentSettingLocalizations[];

  @OneToMany(() => ParentSettingSpecificSkills, (SN) => SN.parent, { cascade: true, onDelete: 'CASCADE' })
  settingSpecificSkills: ParentSettingSpecificSkills[];

  @OneToMany(() => ParentSettingServiceFrequency, (SN) => SN.parent, { cascade: true, onDelete: 'CASCADE' })
  settingServiceFrequency: ParentSettingServiceFrequency[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;

}
