import { IsOptional, IsString } from 'class-validator';

export class SearchNounuCriteriaDto {
  @IsString()
  @IsOptional()
  zone_de_travail?: string;

  @IsString()
  @IsOptional()
  horaire_disponible?: string;

  @IsString()
  @IsOptional()
  adress?: string;

  @IsString()
  @IsOptional()
  tranche_age_enfants?: string;

  @IsString()
  @IsOptional()
  competance_specifique?: string;

  @IsString()
  @IsOptional()
  langue_parler?: string;
}