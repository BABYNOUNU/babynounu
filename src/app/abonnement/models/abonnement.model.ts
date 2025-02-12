import { Paiements } from 'src/app/paiement/models/paiement.model';
import { Parameter } from 'src/app/parameter/models/parameter.model';
import { Parents } from 'src/app/parent/models/parent.model';
import { User } from 'src/app/user/user.model';
import {
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Abonnements {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Paiements, (SN) => SN.abonnement, {
     onDelete: 'CASCADE',
  })
  paiement: Paiements;
  

  @ManyToOne(() => Parameter, (parameter) => parameter.type_abonnements, {
     onDelete: 'CASCADE',
  })
  type: Parameter;

  @ManyToOne(() => User, (user) => user.abonnement, {
     onDelete: 'CASCADE',
  })
  user: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;
}
