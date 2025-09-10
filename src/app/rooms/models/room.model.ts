// src/room/room.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Column,
} from 'typeorm';
import { User } from '../../user/user.model';
import { Message } from '../../messages/models/message.model';
import { Nounu } from 'src/app/nounus/interfaces/nounu.interface';
import { ProfilParents } from '../../parent/models/parent.model';
import { ProfilNounus } from '../../nounus/models/nounu.model';
import { RoomMessageCount } from './unreadCount.model';
import { Contracts } from '../../contracts/models/contracts.model';

@Entity()
export class Rooms {
  @PrimaryGeneratedColumn()
  id: number;

  // Profils
  @ManyToOne(() => ProfilNounus, (nounu) => nounu.nounouRooms, {onDelete: 'CASCADE'})
  nounou: ProfilNounus;

  @ManyToOne(() => ProfilParents, (parent) => parent.parentRooms, {onDelete: 'CASCADE'})
  parent: ProfilParents;
  //  End Profils

  @ManyToOne(() => User, (user) => user.roomReceiver, {onDelete: 'CASCADE'})
  receiver: User;

  @ManyToOne(() => User, (user) => user.roomSender, {onDelete: 'CASCADE'})
  sender: User;

  @OneToMany(() => Contracts, (contract) => contract.room, { cascade: true })
  contract: Contracts;

  @OneToMany(() => RoomMessageCount, (roomUnreadCount) => roomUnreadCount.room, { cascade: true })
  unreadCounts: RoomMessageCount[];

  @OneToMany(() => Message, (message) => message.room)
  messages: Message[];
}
