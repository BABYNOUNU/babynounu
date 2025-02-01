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
import { TypeParameter } from './parameter_type.model';
import { Preference } from 'src/app/Preference/models/preference.model';
import { User } from 'src/app/user/user.model';
// import { ActivityLog } from "./userActivityLog"

@Entity('parameters')
export class Parameter {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column({ nullable: false })
  title: string;

  @ManyToOne(() => TypeParameter, (type) => type.parameter, {
    onDelete: 'CASCADE',
  })
  type_parameter: TypeParameter;

  @OneToMany(() => Preference, (preference) => preference.parameter, {
    cascade: true,
  })
  preference: Preference;

  @ManyToOne(() => User, (p) => p.parametre, { onDelete: 'CASCADE' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
