import { Medias } from 'src/app/media/models/media.model';
import { SettingSpecificSkills } from 'src/app/setting/models/setting_specific_skill.model';
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
import { NounuSettings } from './nounu_setting.model';
import { SettingLanguages } from 'src/app/setting/models/setting_language.model';
import { NounuSettingLanguages } from './nounu_setting_languages.model';
import { NounuSettingLocalizations } from './nounu_setting_localization.model';
import { NounuSettingAgeOfChildrens } from './nounu_setting_age_of_children.model';
import { NounuSettingCertifications } from './nounu_setting_certification.model';
import { NounuSettingDeriredTimes } from './nounu_setting_desired_time.model';
import { NounuSettingAreaWork } from './nounu_settring_area_work.model';
import { NounuSettingSpecificSkills } from './nounu_settring_specific_skill.model';
import { NounuSettingTypeProfil } from './nounu_setting_profil_type.model';

@Entity()
export class Nounus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, nullable: true })
  fullname: string;

  @OneToMany(() => Medias, (media) => media.media_nounu, { cascade: true })
  media: Medias[];

  @Column('varchar', { length: 255, nullable: false })
  old: string;

  @Column('varchar', { length: 255, nullable: false })
  phone: string;

  @Column('varchar', { length: 255, nullable: false })
  adresse: string;

  @Column('varchar', { length: 255, nullable: false })
  year_experience: string;

  @Column('varchar', { length: 255, nullable: false })
  reference_1: string;

  @Column('varchar', { length: 255, nullable: true })
  reference_2: string;

  @Column('varchar', { length: 255, nullable: true })
  reference_3: string;

  @Column('varchar', { length: 255, nullable: true })
  hourly_rate: string;

  @Column('varchar', { length: 255, nullable: true })
  monthly_rate: string;

  @Column('text', { nullable: true })
  biographie: string;

  @Column('boolean', { default: false, nullable: true })
  emergencie: boolean;

  @Column('boolean', { default: false, nullable: true })
  pricing_flexibility: boolean;

  @Column('text', { nullable: true })
  confirmed_identity: string;

  @Column('text', { nullable: true })
  photo: string;

  @OneToOne((type) => User, (user) => user.nounu, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => NounuSettingLanguages, (SN) => SN.nounu, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  settingLanguages: NounuSettingLanguages[];

  @OneToMany(() => NounuSettingLocalizations, (SN) => SN.nounu, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  settingLocalizations: NounuSettingLocalizations[];

  @OneToMany(() => NounuSettingAgeOfChildrens, (SN) => SN.nounu, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  settingAgeOfChildrens: NounuSettingAgeOfChildrens[];

  @OneToMany(() => NounuSettingCertifications, (SN) => SN.nounu, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  settingCertifications: NounuSettingCertifications[];

  @OneToMany(() => NounuSettingDeriredTimes, (SN) => SN.nounu, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  settingDesiredTimes: NounuSettingDeriredTimes[];

  @OneToMany(() => NounuSettingAreaWork, (SN) => SN.nounu, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  settingAreaWorks: NounuSettingAreaWork[];

  @OneToMany(() => NounuSettingSpecificSkills, (SN) => SN.nounu, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  settingSpecificSkills: NounuSettingSpecificSkills[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;
}
