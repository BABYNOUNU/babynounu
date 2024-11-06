import { Abonnement } from 'src/app/abonnement/abonnement';
import { Abonnements } from 'src/app/abonnement/models/abonnement.model';
import { Parents } from 'src/app/parent/models/parent.model';
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

  @Column('varchar', { length: 255, nullable: true })
  transaction: string;

  @Column('int', { nullable: true })
  amount: number;

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

  @OneToMany(() => Abonnements, (NS) => NS.paiement, { cascade: true })
  abonnement: Abonnements;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;
}
