import { Nounus } from 'src/app/nounu/models/nounu.model';
import { Parents } from 'src/app/parent/models/parent.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Medias {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: false, nullable: false })
  url: string;

  @Column({type: 'integer', unique: false, nullable: false })
  size: number;

  @Column('text', { unique: false, nullable: false })
  type: string;

  @Column('boolean', { unique: false, nullable: false, default: false })
  is_profile: boolean;

  @Column('boolean', { unique: false, nullable: false, default: false })
  is_banner: boolean;

  @Column('boolean', { unique: false, nullable: false, default: true })
  is_galery: boolean;

  @Column('boolean', { unique: false, nullable: false, default: false })
  is_document: boolean;

  @OneToMany(() => Parents, (parent) => parent.media, { onDelete: 'CASCADE' })
  media_parent: Parents;

  @OneToMany(() => Nounus, (nounu) => nounu.media, { onDelete: 'CASCADE' })
  media_nounu: Nounus;
}
