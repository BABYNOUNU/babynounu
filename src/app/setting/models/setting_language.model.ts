import { Nounus } from 'src/app/nounu/models/nounu.model';
import { NounuSettings } from 'src/app/nounu/models/nounu_setting.model';
import { NounuSettingLanguages } from 'src/app/nounu/models/nounu_setting_languages.model';
import { Parents } from 'src/app/parent/models/parent.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SettingLanguages {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, unique: true, nullable: true })
  slug: string;

  @Column('varchar', { length: 255, unique: false, nullable: false })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @OneToMany(() => NounuSettingLanguages, (NSL) => NSL.language, {
    cascade: true, onDelete: 'CASCADE',
  })
  nounuSettingLanguages: NounuSettingLanguages[];
}
