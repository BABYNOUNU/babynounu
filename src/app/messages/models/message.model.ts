// src/message/message.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/app/user/user.model';
import { Room } from 'src/app/rooms/models/room.model';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => User, user => user.messages)
  sender: User;

  @ManyToOne(() => Room, room => room.messages)
  room: Room;

  @Column({ default: false })
  isRead: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}