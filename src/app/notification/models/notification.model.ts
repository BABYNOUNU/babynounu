import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { User } from 'src/app/user/user.model';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string; // Type de notification : 'chat', 'job', 'follow'

  @Column()
  message: string; // Contenu de la notification

  @Column({ default: false })
  isRead: boolean; // Indique si la notification a été lue

  @ManyToOne(() => User, (user) => user.notifications)
  user: User; // Utilisateur qui reçoit la notification

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}