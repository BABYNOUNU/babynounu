// src/message/message.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/app/user/user.model';
import { Rooms } from 'src/app/rooms/models/room.model';
import { Message } from 'src/app/messages/models/message.model';

@Entity()
export class Contracts {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Rooms, (room) => room.contract, { onDelete: 'CASCADE' })
  room: Rooms;

  @ManyToOne(() => Message, (message) => message.contract, { onDelete: 'CASCADE' })
  message: Message;

  @Column({ type: 'enum', enum: ['Accepted', 'Pending', 'Canceled'], default: 'Pending' })
  status: 'Accepted' | 'Pending' | 'Canceled';

@CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;
}
