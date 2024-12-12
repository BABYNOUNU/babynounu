import { Parents } from 'src/app/parent/models/parent.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn, } from 'typeorm';
import { NounuSettings } from 'src/app/nounu/models/nounu_setting.model';
import { NounuSettingSpecificSkills } from 'src/app/nounu/models/nounu_settring_specific_skill.model';

@Entity()
export class SettingSpecificSkills {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {  nullable: true })
  slug: string;

  @Column('varchar', { length: 255, unique: false, nullable: false })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => NounuSettingSpecificSkills, (NSL) => NSL.skill, {
    cascade: true, onDelete: 'CASCADE',
  })
  nounuSettingSpecificSkill: NounuSettingSpecificSkills[];
}
