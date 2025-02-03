// src/profiles/entities/profile.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/app/user/user.model';
import { Preference } from 'src/app/Preference/models/preference.model';
import { TypeParameter } from 'src/app/parameter/models/parameter_type.model';
import { Parameter } from 'src/app/parameter/models/parameter.model';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  bio: string;

  @Column()
  level: number;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Parameter, (parameter) => parameter.profiles)
  type: Parameter;
}
