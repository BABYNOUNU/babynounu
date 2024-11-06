import { NounuSettings } from 'src/app/nounu/models/nounu_setting.model';
import { Parents } from 'src/app/parent/models/parent.model';
import { ParentSettings } from 'src/app/parent/models/parent_setting.model';
import { Parent } from 'src/app/parent/parent';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class SettingLanguages {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, unique: true, nullable: true })
  slug: string;

  @Column('varchar', { length: 255, unique: false, nullable: false })
  name: string;

  @OneToMany(() => ParentSettings, (SU) => SU.language, { cascade: true})
  parent: ParentSettings

  @OneToMany(() => NounuSettings, (NS) => NS.language, { cascade: true})
  nounu: NounuSettings
}
