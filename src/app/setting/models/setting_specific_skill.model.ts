import { Parents } from 'src/app/parent/models/parent.model';
import { Parent } from 'src/app/parent/parent';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn, } from 'typeorm';
import { ParentSettings } from 'src/app/parent/models/parent_setting.model';
import { NounuSettings } from 'src/app/nounu/models/nounu_setting.model';

@Entity()
export class SettingSpecificSkills {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, unique: true, nullable: true })
  slug: string;

  @Column('varchar', { length: 255, unique: false, nullable: false })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @OneToMany(() => ParentSettings, (PS) => PS.specific_skills, { cascade: true})
  parent: ParentSettings

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;
}
