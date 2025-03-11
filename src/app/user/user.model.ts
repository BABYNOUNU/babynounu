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
import { Abonnements } from '../abonnement/models/abonnement.model';
import { Notification } from '../notification/models/notification.model';
import { Job } from '../job/models/job.model';
import { Paiements } from '../paiement/models/paiement.model';
import { Conversation } from '../chat/models/conversation.model';
import { JobApplication } from '../job-application/models/job-application.model';
import { Preference } from '../Preference/models/preference.model';
import { Parameter } from '../parameter/models/parameter.model';
import { Nounus } from '../nounus/models/nounu.model';
import { Medias } from '../media/models/media.model';

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

  @ManyToOne(() => Parameter, (SN) => SN.type_profil, { onDelete: 'CASCADE' })
  type_profil: Parameter;
  

  @OneToMany(() => Nounus,  (nounu) => nounu.user, { cascade: true})
  nounu: Nounus[];

  @OneToMany(() => Parents, (parent) => parent.user, { cascade: true })
  parent: Parents[];

  @OneToMany(() => Abonnements, (abonnement) => abonnement.user, {
    cascade: true,
  })
  abonnement: Abonnements;

  @OneToMany(() => Medias, (media) => media.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  medias: Medias[];


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


  @OneToMany(() => Job, (job) => job.user, {
    cascade: true,
  })
  jobs: Job[];

  @OneToMany(() => Paiements, (paiement) => paiement.user, {
    cascade: true,
  })
  paiements: Paiements[];

  

  @ManyToOne(() => Parameter, (parameter) => parameter.role, {  onDelete: 'CASCADE' })
  role: Parameter;
}
