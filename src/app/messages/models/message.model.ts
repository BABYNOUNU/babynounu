// src/app/messages/models/message.model.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../user/user.model';
import { Rooms } from '../../rooms/models/room.model';
import { Contracts } from '../../contracts/models/contracts.model';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'text'})
  content: string;

  @ManyToOne(() => User, (user) => user.messages, { onDelete: 'CASCADE' })
  sender: User;

  
  @OneToMany(() => Contracts, (contract) => contract.message, { onDelete: 'CASCADE' })
  contract: Contracts;

  @ManyToOne(() => Rooms, (room) => room.messages, { onDelete: 'CASCADE' })
  room: Rooms;

  @Column({ default: false })
  isRead: boolean;

  @Column({ type: 'enum', enum: ['Message', 'Proposition'], default: 'Message' })
  type: 'Message' | 'Proposition';

  @Column({ default: false })
  isProposition: boolean;


  @Column({ nullable: true })
  propositionExpired: string | null;

  @Column({ type: 'enum', enum: ['Accepted', 'Refused', 'Pending'], default: 'Pending'})
  proposalStatus: 'Accepted' | 'Refused' | 'Pending';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
