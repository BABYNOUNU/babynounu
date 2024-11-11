import { Parents } from 'src/app/parent/models/parent.model';
import {
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { SettingAgeOfChildren } from './setting_age_of_children.model';
import { SettingGuardSchedules } from './setting_guard_schedule.model';
import { SettingSpecificNeed } from './setting_specific_need.model';
import { SettingSpecificSkills } from './setting_specific_skill.model';
import { SettingLanguages } from './setting_language.model';
import { settingLocalization } from './setting_localization.model';

@Entity()
export class Settings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;
}
