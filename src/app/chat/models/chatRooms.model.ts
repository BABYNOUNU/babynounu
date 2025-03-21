import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from 'typeorm';
import { Rooms } from './rooms.model';
import { User } from 'src/app/user/user.model';

@Entity()
export class ChatRooms {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.messages, { onDelete: 'CASCADE' })
  sender: User;

  @ManyToOne(() => Rooms, (room) => room.id, { onDelete: 'CASCADE' })
  room: Rooms;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;
}
