import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { User } from 'src/app/user/user.model';
import { Job } from 'src/app/job/models/job.model';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string; // Type de notification : 'chat', 'job', 'follow'

  @ManyToOne(() => Job, (job) => job.notifications)
  job: Job;

  @Column()
  message: string; // Contenu de la notification

  @Column({ default: false })
  isRead: boolean; // Indique si la notification a été lue

  @ManyToOne(() => User, (user) => user.notifications, { onDelete: 'CASCADE' })
  user: User; // Utilisateur qui reçoit la notification
  
  @ManyToOne(() => User, (user) => user.sentNotifications, { onDelete: 'CASCADE' })
  sender: User; // Utilisateur qui envoie la notification

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}