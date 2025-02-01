import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Conversation } from './conversation.model';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  conversation: Conversation;
}