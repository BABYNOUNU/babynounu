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
  // @IsArray()
  @IsOptional()
  disponibility_du_prestataire?: any;

  @ApiProperty({ type: [] })
  @IsArray()
  @IsOptional()
  besions_specifiques?: any;

  @ApiProperty({ type: [] })
  @IsArray()
  @IsOptional()
  garde_enfants?: any;

  @ApiProperty({ type: [] })
  @IsArray()
  @IsOptional()
  aide_menagere?: any;

  @ApiProperty({ type: [] })
  @IsArray()
  @IsOptional()
  frequence_des_services?: any;

  @ApiProperty({ type: [] })
  @IsArray()
  @IsOptional()
  horaire_souhaites?: any;

  @ApiProperty({ type: [] })
  // @IsArray()
  @IsOptional()
  adress?: any;

  @ApiProperty({ type: [] })
  @IsArray()
  @IsOptional()
  zone_geographique_prestataire?: any;

  @ApiProperty({ type: [] })
  @IsArray()
  @IsOptional()
  competance_specifique?: any;

  @ApiProperty({ type: [] })
  @IsArray()
  @IsOptional()
  langue_parler?: any;

  @ApiProperty()
  @IsOptional()
  @IsString()
  informations_complementaires?: string;

  @ApiProperty()
  @IsString()
  userId: string;
}

export class UpdateParentDto extends CreateParentDto {}
