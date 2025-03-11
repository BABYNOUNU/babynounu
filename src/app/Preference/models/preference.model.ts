import {
  ManyToOne,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Parameter } from 'src/app/parameter/models/parameter.model';
import { Parents } from 'src/app/parent/models/parent.model';
import { Job } from 'src/app/job/models/job.model';
import { Nounus } from 'src/app/nounus/models/nounu.model';

@Entity('user_preferences')
export class Preference {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Parameter, { onDelete: 'CASCADE' })
  horaire_disponible: Parameter[];

  @ManyToOne(() => Parameter, { onDelete: 'CASCADE' })
  zone_de_travail: Parameter[];

  @ManyToOne(() => Parameter, { onDelete: 'CASCADE' })
  type_services: Parameter[];

  @ManyToOne(() => Parameter, { onDelete: 'CASCADE' })
  equipement_menager: Parameter[];

  @ManyToOne(() => Parameter, { onDelete: 'CASCADE' })
  criteres_specifiques: Parameter[];

  @ManyToOne(() => Parameter, { onDelete: 'CASCADE' })
  certifications_criteres: Parameter[];

  @ManyToOne(() => Parameter, { onDelete: 'CASCADE' })
  tranche_age_enfants: Parameter[];

  @ManyToOne(() => Parameter, { onDelete: 'CASCADE' })
  besions_specifiques: Parameter[];

  @ManyToOne(() => Parameter, { onDelete: 'CASCADE' })
  garde_enfants: Parameter[];

  @ManyToOne(() => Parameter, { onDelete: 'CASCADE' })
  aide_menagere: Parameter[];

  @ManyToOne(() => Parameter, { onDelete: 'CASCADE' })
  frequence_des_services: Parameter[];

  @ManyToOne(() => Parameter, { onDelete: 'CASCADE' })
  horaire_souhaites: Parameter[];

  @ManyToOne(() => Parameter, { onDelete: 'CASCADE' })
  adress: Parameter[];

  @ManyToOne(() => Parameter, { onDelete: 'CASCADE' })
  disponibility_du_prestataire: Parameter[];

  @ManyToOne(() => Parameter, { onDelete: 'CASCADE' })
  zone_geographique_prestataire: Parameter[];

  @ManyToOne(() => Parameter, { onDelete: 'CASCADE' })
  competance_specifique: Parameter[];

  @ManyToOne(() => Parameter, { onDelete: 'CASCADE' })
  mode_de_paiement: Parameter[];

  @ManyToOne(() => Parameter, { onDelete: 'CASCADE' })
  taches: Parameter[];


  @ManyToOne(() => Parameter, { onDelete: 'CASCADE' })
  langue_parler: Parameter[];

  @ManyToOne(() => Parameter, { onDelete: 'CASCADE' })
  criteres_selections: Parameter[];

  @ManyToOne(() => Parents, (parent) => parent.preferences, {
    onDelete: 'CASCADE',
  })
  parents: Parents;

  @ManyToOne(() => Nounus, (nounu) => nounu.preferences, {
    onDelete: 'CASCADE',
  })
  nounus: Nounus;

  @ManyToOne(() => Job, (job) => job.preferences, { onDelete: 'CASCADE' })
  jobs: Job;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
