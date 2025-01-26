import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Parents } from '../parent/models/parent.model';
import { Roles } from '../role/models/role.model';
import { Nounus } from '../nounu/models/nounu.model';
import { Abonnements } from '../abonnement/models/abonnement.model';
import { SettingTypeProfil } from '../setting/models/setting_type_profil.model';
import { Notification } from '../notification/models/notification.model';
import { Job } from '../job/models/job.model';
import { Paiements } from '../paiement/models/paiement.model';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, unique: true })
  slug: string;

  @Column('varchar', { length: 255, unique: true })
  email: string;

  @Column('text')
  password: string;

  @Column('text', { nullable: true })
  access_token: string;

  @ManyToOne(() => SettingTypeProfil, (SN) => SN.userType, { onDelete: 'CASCADE' })
  type_profil: SettingTypeProfil;
  

  @OneToOne(() => Nounus, { eager: true, cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  nounu: Nounus;

  @OneToOne(() => Parents, { eager: true, cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  parent: Parents;

  @OneToMany(() => Abonnements, (abonnement) => abonnement.user, {
    cascade: true,
  })
  abonnement: Nounus;

  @OneToMany(() => Notification, (notification) => notification.user, {
    cascade: true,
  })
  notifications: Notification[];

  @OneToMany(() => Job, (job) => job.user, {
    cascade: true,
  })
  jobs: Job[];

  @OneToMany(() => Paiements, (paiement) => paiement.user, {
    cascade: true,
  })
  paiements: Paiements[];
  

  @ManyToOne(() => Roles, (role) => role.user, {  onDelete: 'CASCADE' })
  role: Roles;
}
