import { Job } from '../../job/models/job.model';
import { ProfilNounus } from '../../nounus/models/nounu.model';
import { Parameter } from '../../parameter/models/parameter.model';
import { ProfilParents } from '../../parent/models/parent.model';
import { User } from '../../user/user.model';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date | null;
}
