import { Job } from 'src/app/job/models/job.model';
import { ProfilNounus } from 'src/app/nounus/models/nounu.model';
import { Parameter } from 'src/app/parameter/models/parameter.model';
import { ProfilParents } from 'src/app/parent/models/parent.model';
import { User } from 'src/app/user/user.model';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Medias {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  originalName: string;

  @Column()
  filename: string;

  @Column()
  path: string;

  @Column({nullable: true})
  originalUrl: string;

  @ManyToOne(() => User, (user) => user.medias, {onDelete: 'CASCADE'})
  user: User;

  @ManyToOne(() => Job, (job) => job.medias, {onDelete: 'CASCADE'})
  job: Job;


  @ManyToOne(() => Parameter, (parameter) => parameter.type_media)
  type_media: Parameter;

  
}
