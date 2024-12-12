import { NounuSettings } from 'src/app/nounu/models/nounu_setting.model';
import { NounuSettingAgeOfChildrens } from 'src/app/nounu/models/nounu_setting_age_of_children.model';
import { NounuSettingTypeProfil } from 'src/app/nounu/models/nounu_setting_profil_type.model';
import { Parents } from 'src/app/parent/models/parent.model';
import { User } from 'src/app/user/user.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class SettingTypeProfil {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255, unique: true, nullable: true })
  slug: string;

  @Column('varchar', { length: 255, unique: false, nullable: false })
  name: string;

  @Column('text', { nullable: true })
  description: string;


  @OneToMany(() => User, (NSL) => NSL.type_profil, {
    cascade: true, onDelete: 'CASCADE',
  })
  userType: User[];

}
