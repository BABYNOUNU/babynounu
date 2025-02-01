import { Abonnements } from 'src/app/abonnement/models/abonnement.model';
import { Parents } from 'src/app/parent/models/parent.model';
import { User } from 'src/app/user/user.model';
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

  @Column()
  amount: number; // Montant du paiement

  @Column('varchar', { length: 255, nullable: true }) 
  currency: string; // Devise (ex: USD, EUR)

  @Column('varchar', { length: 255, nullable: true })
  status: string; // Statut du paiement (ex: "pending", "completed", "failed")

  @Column('varchar', { length: 255, nullable: true })
  payment_token: string;

  @Column('varchar', { length: 255, nullable: true })
  paymentMethod: string; // Méthode de paiement (ex: "credit_card", "paypal")

  @Column('varchar', { length: 255, nullable: true })
  customer_name: string;

  @Column('varchar', { length: 255, nullable: true })
  customer_surname: string;

  @Column('varchar', { length: 255, nullable: true })
  customer_email: string;

  @Column('varchar', { length: 255, nullable: true })
  customer_phone_number: string;

  @Column('varchar', { length: 255, nullable: true })
  customer_address: string;

  @Column('varchar', { length: 255, nullable: true })
  customer_city: string;

  @Column('varchar', { length: 255, nullable: true })
  customer_country: string;

  @Column('varchar', { length: 255, nullable: true })
  customer_state: string;

  @Column('varchar', { length: 255, nullable: true })
  customer_zip_code: string;

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
