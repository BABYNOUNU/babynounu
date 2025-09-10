// src/app/parent/dto/update-parent.dto.ts
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateParentDto } from './create-parent.dto';
import { IsOptional } from 'class-validator';

export class UpdateParentDto extends PartialType(CreateParentDto) {
  @ApiProperty({ required: false })
  @IsOptional()
  fullname?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  adresse_mail?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  phone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  number_of_children?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  budget_estimated?: string;

  @ApiProperty({ required: false, type: [] })
  @IsOptional()
  disponibility_du_prestataire?: any;

  @ApiProperty({ required: false, type: [] })
  @IsOptional()
  besions_specifiques?: any;

  @ApiProperty({ required: false, type: [] })
  @IsOptional()
  garde_enfants?: any;

  @ApiProperty({ required: false, type: [] })
  @IsOptional()
  aide_menagere?: any;

  @ApiProperty({ required: false, type: [] })
  @IsOptional()
  frequence_des_services?: any;

  @ApiProperty({ required: false, type: [] })
  @IsOptional()
  horaire_souhaites?: any;

  @ApiProperty({ required: false, type: [] })
  @IsOptional()
  adress?: any;

  @ApiProperty({ required: false, type: [] })
  @IsOptional()
  zone_geographique_prestataire?: any;

  @ApiProperty({ required: false, type: [] })
  @IsOptional()
  competance_specifique?: any;

  @ApiProperty({ required: false, type: [] })
  @IsOptional()
  langue_parler?: any;

  @ApiProperty({ required: false, type: [] })
  @IsOptional()
  mode_de_paiement?: any;

  @ApiProperty({ required: false })
  @IsOptional()
  informations_complementaires?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  userId?: string;
}