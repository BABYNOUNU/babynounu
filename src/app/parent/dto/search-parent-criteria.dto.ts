// src/app/parent/dto/search-parent-criteria.dto.ts
import { IsArray, IsOptional, IsString } from 'class-validator';

export class SearchParentCriteriaDto {

  @IsString()
  @IsOptional()
  fullname?: string;
  
  @IsArray()
  @IsOptional()
  besions_specifiques?: string;

  @IsArray()
  @IsOptional()
  garde_enfants?: string;

  @IsArray()
  @IsOptional()
  aide_menagere?: string;

  @IsArray()
  @IsOptional()
  frequence_des_services?: string;

  @IsArray()
  @IsOptional()
  horaire_souhaites?: string;

  @IsArray()
  @IsOptional()
  zone_geographique_prestataire?: string;

  @IsArray()
  @IsOptional()
  disponibility_du_prestataire?: string;
}