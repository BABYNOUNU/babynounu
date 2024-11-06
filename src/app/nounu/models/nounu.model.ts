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
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { NounuSettings } from './nounu_setting.model';

@Entity()
export class Nounus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, unique: false, nullable: true })
  fullname: string;

  @ManyToOne(() => Medias, (media) => media.media_nounu, { cascade: true })
  media: Medias[];

  @Column('varchar', { length: 255, unique: false, nullable: false })
  old: string;

  @Column('varchar', { length: 255, unique: false, nullable: false })
  phone: string;

  @Column('varchar', { length: 255, unique: false, nullable: false })
  adresse: string;

  @Column('varchar', { length: 255, unique: false, nullable: false })
  year_experience: string;

  @Column('varchar', { length: 255, unique: false, nullable: true })
  hourly_rate: string;

  @Column('varchar', { length: 255, unique: false, nullable: true })
  monthly_rate: string

  @Column('boolean', { default: false, unique: false, nullable: true })
  pricing_flexibility: boolean


  @Column('boolean', { default: false, unique: false, nullable: true })
  confirmed_verification: boolean

  @ManyToOne(() => NounuSettings, (ST) => ST.nounu, { cascade: true })
  setting: NounuSettings[];

  @ManyToOne(() => User, (user) => user.parent, { cascade: true })
  user: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;
}
