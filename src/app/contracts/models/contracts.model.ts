import { Nounus } from 'src/app/nounus/models/nounu.model';
import { Parents } from 'src/app/parent/models/parent.model';
import { User } from 'src/app/user/user.model';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';


@Entity()
export class Contracts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'numeric', nullable: false })
  price: number;

  @Column({ type: 'numeric', nullable: false })
  duration: number;

  @ManyToOne(() => Nounus, (nounu) => nounu.contracts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'nounu_id' })
  nounu: Nounus;

  @ManyToOne(() => Parents, (parent) => parent.contracts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parent_id' })
  parent: Parents;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;
}
