// src/app/paiement/models/paiement.model.ts
import { Abonnements } from '../../abonnement/models/abonnement.model';
import { ProfilParents } from '../../parent/models/parent.model';
import { User } from '../../user/user.model';
import {
  Entity,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity()
export class Paiements {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, nullable: true, unique: true })
  transaction_id: string;

  @Column('varchar', { length: 255, nullable: true, unique: true })
  operator_id: string;

  @Column({ type: 'timestamp', nullable: true })
  payment_date: Date; // Date du paiement

  @Column()
  amount: number; // Montant du paiement

  @Column('varchar', { length: 255, nullable: true }) 
  currency: string; // Devise (ex: USD, EUR)

  @Column('varchar', { length: 255, nullable: true })
  status: string; // Statut du paiement (ex: "pending", "completed", "failed")

  @Column('varchar', { length: 255, nullable: true })
  payment_token: string;

  @Column('varchar', { length: 255, nullable: true })
  payment_type: string

  @Column('varchar', { length: 255, nullable: true })
  paymentMethod: string; // Méthode de paiement (ex: "credit_card", "paypal")

  @OneToMany(() => Abonnements, (NS) => NS.paiement, { cascade: true, })
  abonnement: Abonnements;

  @ManyToOne(() => User, (user) => user.paiements, { onDelete: 'CASCADE' })
  user: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;
}
