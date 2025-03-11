import { IsOptional, IsString } from 'class-validator';

export class SearchParentCriteriaDto {
  @IsString()
  @IsOptional()
  besions_specifiques?: string;

  @IsString()
  @IsOptional()
  garde_enfants?: string;

  @IsString()
  @IsOptional()
  aide_menagere?: string;

  @IsString()
  @IsOptional()
  frequence_des_services?: string;

  @IsString()
  @IsOptional()
  horaire_souhaites?: string;

  @IsString()
  @IsOptional()
  zone_geographique_prestataire?: string;

  @IsString()
  @IsOptional()
  disponibility_du_prestataire?: string;
}