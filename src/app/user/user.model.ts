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
import { Conversation } from '../chat/models/conversation.model';
import { JobApplication } from '../job-application/models/job-application.model';
import { Preference } from '../Preference/models/preference.model';
import { Parameter } from '../parameter/models/parameter.model';
import { Profile } from '../profiles/models/profile.model';

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

  @OneToMany(() => Notification, (notification) => notification.sender, {
    cascade: true,
  })
  sentNotifications: Notification[];

  @OneToMany(() => Conversation, (conversation) => conversation.user, {
    cascade: true,
  })
  conversations: Conversation[];

  @OneToMany(() => JobApplication, (job_to_apply) => job_to_apply.user, {
    cascade: true,
  })
  job_to_apply: JobApplication[];

  @OneToOne(() => Profile, profile => profile.user)
  profile: Profile;

  @OneToMany(() => Job, (job) => job.user, {
    cascade: true,
  })
  jobs: Job[];

  @OneToMany(() => Paiements, (paiement) => paiement.user, {
    cascade: true,
  })
  paiements: Paiements[];

  @OneToMany(() => Preference, (preference) => preference.user, {cascade: true})
  preference: Preference;
  

  @ManyToOne(() => Roles, (role) => role.user, {  onDelete: 'CASCADE' })
  role: Roles;
}
