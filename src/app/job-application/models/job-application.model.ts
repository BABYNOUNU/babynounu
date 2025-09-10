// src/app/job-application/models/job-application.model.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../user/user.model';
import { Job } from '../../job/models/job.model';

@Entity('job_application') // Nom de la table en minuscules ou snake_case
export class JobApplication {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.job_to_apply, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Job, (job) => job.jobApplications, { onDelete: 'CASCADE' })
  jobs: Job; // Tableau d'instances de Job

  @Column({ default: 0 })
  limit: number;

  @Column({ type: 'boolean', default: false })
  is_apply: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}