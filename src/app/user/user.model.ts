import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Parents } from '../parent/models/parent.model';
import { Roles } from '../role/models/role.model';
import { Nounus } from '../nounu/models/nounu.model';
import { Abonnements } from '../abonnement/models/abonnement.model';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, unique: true })
  slug: string;

  @Column('varchar', { length: 255, unique: true })
  email: string;

  @Column('text')
  password: string;

  @Column('text', {nullable: true})
  access_token: string;

  @OneToMany(() => Parents, (parent) => parent.user, { onDelete: 'CASCADE'})
  parent: Parents

  @OneToMany(() => Nounus, (nounu) => nounu.user, { onDelete: 'CASCADE'})
  nounu: Nounus

  @OneToMany(() => Abonnements, (abonnement) => abonnement.user, { onDelete: 'CASCADE'})
  abonnement: Nounus

  @ManyToOne(() => Roles, (role) => role.user, { cascade: true })
  role: Roles
}
