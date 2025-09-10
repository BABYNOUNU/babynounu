import { IsArray, IsOptional, IsString } from 'class-validator';

export class SearchNounuCriteriaDto {
  @IsArray()
  @IsOptional()
  zone_de_travail?: any[];

  @IsArray()
  @IsOptional()
  horaire_disponible?: any[];

  @IsArray()
  @IsOptional()
  adress?: any[];

  @IsArray()
  @IsOptional()
  tranche_age_enfants?: any[];

  @IsArray()
  @IsOptional()
  competance_specifique?: any[];

  @IsArray()
  @IsOptional()
  langue_parler?: any[];
}
