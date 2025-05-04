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
import { Preference } from 'src/app/Preference/models/preference.model';
import { Medias } from 'src/app/media/models/media.model';
import { Rooms } from 'src/app/rooms/models/room.model';
import { Contracts } from 'src/app/contracts/models/contracts.model';

@Entity()
export class ProfilParents {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Informations Personnelles

  @Column('varchar', { length: 255, unique: false, nullable: true })
  fullname: string;

  @Column('varchar', { length: 255, unique: false, nullable: false })
  adresse_mail: string;

  @Column('varchar', { length: 255, unique: false, nullable: false })
  phone: string;

  // Informations sur les enfants

  @Column('varchar', { length: 255, unique: false, nullable: false })
  number_of_children: string;

  @Column({ type: 'varchar', length: 255, unique: false, nullable: false })
  budget_estimated: string;

  @OneToMany(() => Preference, (preference) => preference.parents, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  preferences: Preference[];

  @ManyToOne(() => User, (user) => user.parent, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => Rooms, (room) => room.parent, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  parentRooms: Rooms[];

  @Column({ type: 'text', nullable: true })
  informations_complementaires: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;
}
