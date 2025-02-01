import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { User } from 'src/app/user/user.model';
import { Notification } from 'src/app/notification/models/notification.model';
import { JobApplication } from 'src/app/job-application/models/job-application.model';

@Entity('job')
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  budget_min: string;

  @Column()
  budget_max: string;

  @Column()
  service_frequency: string;

  @OneToMany(() => Notification, (notification) => notification.job)
  notifications: Notification[];

  @OneToMany(() => JobApplication, (jobApplication) => jobApplication.jobs, { cascade: true })
  job_application: JobApplication; // Pas un tableau

  @Column()
  schedules_available: string;

  @ManyToOne(() => User, (user) => user.jobs)
  user: User;
}