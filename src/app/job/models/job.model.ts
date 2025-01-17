import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/app/user/user.model';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string; // Titre de l'offre d'emploi

  @Column()
  description: string; // Description de l'offre

  @Column()
  location: string; // Localisation du poste

  @Column()
  salary: number; // Salaire proposé

  @ManyToOne(() => User, (user) => user.jobs)
  user: User; // Utilisateur qui a posté l'offre
}