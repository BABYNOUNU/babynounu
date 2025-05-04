import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Rooms } from "./room.model";
import { User } from "src/app/user/user.model";


@Entity()
export class RoomMessageCount {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Rooms, room => room.unreadCounts)
  room: Rooms;

  @ManyToOne(() => User)
  user: User;

  @Column({ default: 0 })
  count: number;
}