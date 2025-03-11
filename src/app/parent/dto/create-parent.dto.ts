import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsEmail,
  IsArray,
  IsNotEmpty,
} from 'class-validator';

export class CreateParentDto {
  @ApiProperty()
  @IsString()
  fullname: string;

  @ApiProperty()
  @IsEmail()
  adresse_mail: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  number_of_children: string;

  @ApiProperty()
  @IsString()
  budget_estimated: string;

  @ApiProperty({ type: [] })
  //
  @IsOptional()
  disponibility_du_prestataire?: any;

  @ApiProperty({ type: [] })
  @IsOptional()
  besions_specifiques?: any;

  @ApiProperty({ type: [] })
  @IsOptional()
  garde_enfants?: any;

  @ApiProperty({ type: [] })
  @IsOptional()
  aide_menagere?: any;

  @ApiProperty({ type: [] })
  @IsOptional()
  frequence_des_services?: any;

  @ApiProperty({ type: [] })
  @IsOptional()
  horaire_souhaites?: any;

  @ApiProperty({ type: [] })
  //
  @IsOptional()
  adress?: any;

  @ApiProperty({ type: [] })
  @IsOptional()
  zone_geographique_prestataire?: any;

  @ApiProperty({ type: [] })
  @IsOptional()
  competance_specifique?: any;

  @ApiProperty({ type: [] })
  @IsOptional()
  langue_parler?: any;

  @ApiProperty({ type: [] })
  @IsOptional()
  mode_de_paiement?: any;

  @ApiProperty()
  @IsOptional()
  @IsString()
  informations_complementaires?: string;

  @ApiProperty()
  @IsString()
  userId: string;
}
