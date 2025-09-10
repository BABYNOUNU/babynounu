import { ProfilParents } from '../../parent/models/parent.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/user.model';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255, unique: true, nullable: true })
  slug: string;

  @Column('varchar', { length: 255, unique: false, nullable: false })
  name: string | number;

  @Column('text', { nullable: true })
  description: string;

  @OneToMany(() => User, (user) => user.role, { cascade: true})
  user: User

}
