import {
  ManyToOne,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Preference } from 'src/app/Preference/models/preference.model';
import { TypeParameter } from './parameter_type.model';
import { User } from 'src/app/user/user.model';
import { Abonnements } from 'src/app/abonnement/models/abonnement.model';
import { Medias } from 'src/app/media/models/media.model';

@Entity('parameters')
export class Parameter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  slug: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 0 })
  priority: number;

  @ManyToOne(() => TypeParameter, (type) => type.parameter, { onDelete: 'CASCADE' })
  type_parameter: TypeParameter;

  @OneToMany(() => User, (user) => user.type_profil, { cascade: true })
  type_profil: User[];

  @OneToMany(() => User, (user) => user.role, { cascade: true })
  role: User[];

  @OneToMany(() => Abonnements, (abonnement) => abonnement.type, { cascade: true })
  type_abonnements: Abonnements[];

  @OneToMany(() => Medias, (media) => media.type_media, { cascade: true })
  type_media: Medias;

  @OneToMany(() => Preference, (preference) => preference.horaire_disponible, { cascade: true })
  horaire_disponible: Preference;

  @OneToMany(() => Preference, (preference) => preference.zone_de_travail, { cascade: true })
  zone_de_travail: Preference;

  @OneToMany(() => Preference, (preference) => preference.tranche_age_enfants, { cascade: true })
  tranche_age_enfants: Preference;

  @OneToMany(() => Preference, (preference) => preference.besions_specifiques, { cascade: true })
  besions_specifiques: Preference;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
