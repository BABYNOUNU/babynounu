import { NounuSettings } from 'src/app/nounu/models/nounu_setting.model';
import { ParentSettings } from 'src/app/parent/models/parent_setting.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class SettingLocalization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, unique: false, nullable: true })
  slug: string;

  @Column('varchar', { length: 255, unique: false, nullable: false })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @OneToMany(() => ParentSettings, (SU) => SU.localization, { cascade: true })
  parent: ParentSettings;

  @OneToMany(() => NounuSettings, (NS) => NS.localization, { cascade: true})
  nounu: NounuSettings
}
