// src/app/job/dtos/create-job.dto.ts
import {
  IsString,
  IsOptional,
  IsArray,
  IsUUID,
  IsNotEmpty,
} from 'class-validator';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  readonly titre: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

 
  @IsOptional()
  readonly adress: any;

 
  @IsOptional()
  readonly zone_de_travail: any;

  @IsString()
  @IsOptional()
  readonly moyens_de_contact: string;

  @IsString()
  @IsOptional()
  readonly type_services: string;

 
  @IsOptional()
  readonly combinaison_service: any;

 
  @IsOptional()
  readonly taches: any;

 
  @IsOptional()
  readonly frequence_des_services: any;

 
  @IsOptional()
  readonly horaire_souhaites: any;

  @IsString()
  @IsOptional()
  readonly inclus_weekend: string;

  @IsString()
  @IsOptional()
  readonly nombre_enfants: string;

 
  @IsOptional()
  readonly garde_enfants: any;

 
  @IsOptional()
  readonly besions_specifiques: any;

 
  @IsOptional()
  readonly competance_specifique: any;

 
  @IsOptional()
  readonly langue_parler: any;

 
  @IsOptional()
  readonly aide_menagere: any;

 
  @IsOptional()
  readonly equipement_menager: any;

  @IsString()
  @IsOptional()
  readonly experience_minimun: string;

  @IsString()
  @IsOptional()
  readonly annee_experience: string;

 
  @IsOptional()
  readonly certifications_criteres: any;

 
  @IsOptional()
  readonly criteres_selections: any;

  @IsString()
  @IsOptional()
  readonly tarif: string;

  @IsString()
  @IsOptional()
  readonly negociable: string;

  @IsString()
  @IsOptional()
  readonly date_debut: string;

  @IsString()
  @IsOptional()
  readonly mission_urgente: string;

  @IsString()
  @IsOptional()
  readonly description_complementaire: string;


  @IsString()
  @IsNotEmpty()
  readonly user_id: any;

}