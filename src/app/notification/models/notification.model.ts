import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { User } from '../../user/user.model';
import { Job } from '../../job/models/job.model';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string; // Type de notification : 'chat', 'job', 'follow'

  @ManyToOne(() => Job, (job) => job.notifications, { onDelete: 'CASCADE' })
  job: Job;

  @Column()
  message: string; // Contenu de la notification


  @Column({nullable: true})
  tolinkId: string

  @Column({ default: false })
  isRead: boolean; // Indique si la notification a été lue

  @ManyToOne(() => User, (user) => user.notifications, { onDelete: 'CASCADE' })
  user: User; // Utilisateur qui reçoit la notification

  @ManyToOne(() => User, (user) => user.sentNotifications, { onDelete: 'CASCADE' })
  sender: User; // Utilisateur qui envoie la notification

  


  @Column({ default: false })
  isActions: boolean;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}