// src/room/room.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Column,
} from 'typeorm';
import { User } from 'src/app/user/user.model';
import { Message } from 'src/app/messages/models/message.model';
import { Nounu } from 'src/app/nounus/interfaces/nounu.interface';
import { Parents } from 'src/app/parent/models/parent.model';
import { Nounus } from 'src/app/nounus/models/nounu.model';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Nounus, (nounu) => nounu.nounouRooms)
  nounou: Nounus;

  @ManyToOne(() => Parents, (parent) => parent.parentRooms)
  parent: Parents;

  @OneToMany(() => Message, (message) => message.room)
  messages: Message[];

  @Column({ default: 0 })
  parentUnreadCount: number;

  @Column({ default: 0 })
  nounuUnreadCount: number;

  @Column({ default: 0 })
  administrateurUnreadCount: number;
}
