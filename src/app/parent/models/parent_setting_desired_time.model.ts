import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Parents } from './parent.model';
import { SettingDesiredTime } from 'src/app/setting/models/setting_desired_time.model';

@Entity()
export class ParentSettingDeriredTimes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Parents, (parent) => parent.settingDesiredTimes, { onDelete: 'CASCADE' })
  parent: Parents;

  @ManyToOne(() => SettingDesiredTime, { onDelete: 'CASCADE' })
  time: SettingDesiredTime;
}
