import { Nounus } from 'src/app/nounu/models/nounu.model';
import { Parents } from 'src/app/parent/models/parent.model';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Medias {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: false, nullable: false })
  url: string;

  @ManyToOne(() => Nounus, (nounu) => nounu.media, { onDelete: 'CASCADE' })
  media_nounu: Nounus;
}
