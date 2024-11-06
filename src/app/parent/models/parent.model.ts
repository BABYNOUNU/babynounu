import { Medias } from 'src/app/media/models/media.model';
import { settingAgeOfChildren } from 'src/app/setting/models/setting_age_of_children.model';
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
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ParentSettings } from './parent_setting.model';

@Entity()
export class Parents {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, unique: false, nullable: true })
  fullname: string;

  @ManyToOne(() => Medias, (media) => media.media_parent, { cascade: true })
  media: Medias[];

  @Column('varchar', { length: 255, unique: false, nullable: false })
  old: string;

  @Column('varchar', { length: 255, unique: false, nullable: false })
  phone: string;

  @Column('varchar', { length: 255, unique: false, nullable: false })
  adresse: string;

  @ManyToOne(() => ParentSettings, (parent) => parent.id, { cascade: true })
  setting: ParentSettings[];

  @Column({ type: 'varchar', length: 255, unique: false, nullable: false })
  budget_min: string;

  @Column({ type: 'varchar', length: 255, unique: false, nullable: false })
  budget_max: string;

  @Column({ type: 'varchar', length: 255, unique: false, nullable: false })
  mode_de_paiement: string;

  @ManyToOne(() => User, (user) => user.parent, { cascade: true })
  user: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;
}
