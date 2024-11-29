import { Parents } from 'src/app/parent/models/parent.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SettingChildrenAgeGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, unique: true, nullable: true })
  slug: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('varchar', { length: 255, unique: false, nullable: false })
  name: string;

  
}
