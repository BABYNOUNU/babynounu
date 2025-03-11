import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/app/user/user.model';
import { Notification } from 'src/app/notification/models/notification.model';
import { JobApplication } from 'src/app/job-application/models/job-application.model';
import { Preference } from 'src/app/Preference/models/preference.model';
import { Medias } from 'src/app/media/models/media.model';

@Entity('job')
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  titre: string;

  @Column({  type: 'text' })
  description: string;

  @Column({  type: 'text' })
  moyens_de_contact: string;

  @Column({  type: 'boolean', default: false  })
  combinaison_service: boolean;

  @Column({ name: 'inclus_weekend', type: 'boolean', default: false })
  inclusWeekend: boolean;

  @Column({ name: 'nombre_enfants', type: 'varchar', nullable: true, default: '' })
  nombreEnfants?: string;

  @Column({ name: 'experience_minimun', type: 'boolean', default: false })
  experience_minimun: boolean;

  @Column({ name: 'annee_experience', type: 'varchar', nullable: true, default: '' })
  annee_experience?: string;

  @Column({ name: 'tarif_propose',  type: 'varchar', nullable: true, default: '' })
  tarifPropose: string;

  @Column({ type: 'boolean', default: false })
  negociable: boolean;

  @Column({ name: 'date_debut', type: 'varchar', default: '' })
  dateDebut: string;

  @Column({ name: 'mission_urgente', type: 'boolean', default: false })
  missionUrgente: boolean;

  @Column({ name: 'description_complementaire', type: 'text' }) 
  descriptionComplementaire: string;

  @OneToMany(() => Preference, (preference) => preference.jobs, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  preferences: Preference[];

  @OneToMany(() => JobApplication, (jobApplication) => jobApplication.jobs, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  jobApplications: JobApplication[];

  
  @OneToMany(() => Notification, (notification) => notification.job, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  notifications: Notification[];

  
  @OneToMany(() => Medias, (medias) => medias.job, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  medias: Medias[];

  @ManyToOne(() => User, (user) => user.jobs, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;


  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date | null;
}


