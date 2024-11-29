import { NounuSettings } from 'src/app/nounu/models/nounu_setting.model';
import { NounuSettingCertifications } from 'src/app/nounu/models/nounu_setting_certification.model';
import { Parents } from 'src/app/parent/models/parent.model';
import { ParentSettings } from 'src/app/parent/models/parent_setting.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class SettingCertifications {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, unique: true, nullable: true })
  slug: string;

  @Column('varchar', { length: 255, unique: false, nullable: false })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @OneToMany(() => NounuSettingCertifications, (NSL) => NSL.certification, {
    onDelete: 'CASCADE',
  })
  nounuSettingAreaWork: NounuSettingCertifications[];

}
