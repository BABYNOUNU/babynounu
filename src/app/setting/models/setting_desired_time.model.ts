import { NounuSettings } from 'src/app/nounu/models/nounu_setting.model';
import { NounuSettingDeriredTimes } from 'src/app/nounu/models/nounu_setting_desired_time.model';
import { Parents } from 'src/app/parent/models/parent.model';
import { ParentSettings } from 'src/app/parent/models/parent_setting.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class SettingDesiredTime {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, unique: true, nullable: true })
  slug: string;

  @Column('varchar', { length: 255, unique: false, nullable: false })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @OneToMany(() => ParentSettings, (SU) => SU.age_of_children, { cascade: true})
  parent: ParentSettings

  @OneToMany(() => NounuSettingDeriredTimes, (NSL) => NSL.time, {
    onDelete: 'CASCADE',
  })
  nounuSettingAreaWork: NounuSettingDeriredTimes[];

}
