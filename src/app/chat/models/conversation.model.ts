import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/app/user/user.model';
import { Message } from './message.model';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.conversations)
  user: User;

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];
}