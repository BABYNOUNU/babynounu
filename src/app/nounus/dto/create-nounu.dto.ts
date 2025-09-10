import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class CreateNounuDto {
  @ApiProperty({ description: 'The fullName of the Nounu', example: 'Nounu 1' })
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @ApiProperty({ description: 'The age of the Nounu', example: '25' })
  @IsString()
  @IsNotEmpty()
  age: string;

  @ApiProperty({
    description: 'The phone of the Nounu',
    example: '514-123-4567',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    description: 'The annees_experience of the Nounu',
    example: '2',
  })
  @IsString()
  @IsNotEmpty()
  annees_experience: string;

  @ApiProperty({ description: 'The urgences of the Nounu', example: 'false' })
  @IsString()
  @IsNotEmpty()
  urgences: string;

  @ApiProperty({
    description: 'The tarif_horaire of the Nounu',
    example: '20.00',
  })
  @IsString()
  @IsNotEmpty()
  tarif_horaire: string;

  @ApiProperty({
    description: 'The tarif_mensuel of the Nounu',
    example: '800.00',
  })
  @IsString()
  @IsNotEmpty()
  tarif_mensuel: string;

  @ApiProperty({
    description: 'The flexibilite_tarifaire of the Nounu',
    example: 'true',
  })
  @IsString()
  @IsNotEmpty()
  flexibilite_tarifaire: string;

  @ApiProperty({
    description: 'The courte_biographie of the Nounu',
    example: 'This is a Nounu',
  })
  @IsString()
  @IsNotEmpty()
  courte_biographie: string;

  @ApiProperty({
    description: 'The evaluation_precedentes of the Nounu',
    example: 'Good',
  })
  @IsString()
  @IsNotEmpty()
  evaluation_precedentes: string;

  @ApiProperty({
    description: 'The user ID of the Nounu',
    example: '1234567890',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'The zone_de_travail of the Nounu',
    example: "Montr'eal",
  })
  @IsString()
  @IsOptional()
  zone_de_travail?: string;

  @ApiProperty({
    description: 'The besions_specifiques of the Nounu',
    example: 'Diab`ete',
  })
  @IsString()
  @IsOptional()
  besions_specifiques?: string;

  @ApiProperty({
    description: 'The aide_menagere of the Nounu',
    example: 'true',
  })
  @IsString()
  @IsOptional()
  aide_menagere?: string;

  @ApiProperty({
    description: 'The frequence_des_services of the Nounu',
    example: '3 fois par semaine',
  })
  @IsString()
  @IsOptional()
  frequence_des_services?: string;

  @ApiProperty({
    description: 'The horaire_disponible of the Nounu',
    example: '8h00 - 18h00',
  })
  @IsString()
  @IsOptional()
  horaire_disponible?: string;

  @ApiProperty({
    description: 'The adress of the Nounu',
    example: "1200, rue Sainte-Catherine O, Montr'eal, QC H3G 1P1",
  })
  @IsString()
  @IsOptional()
  adress?: string;

  @ApiProperty({
    description: 'The tranche_age_enfants of the Nounu',
    example: '0 - 12',
  })
  @IsString()
  @IsOptional()
  tranche_age_enfants?: string;

  @ApiProperty({
    description: 'The competance_specifique of the Nounu',
    example: 'Soins de base',
  })
  @IsString()
  @IsOptional()
  competance_specifique?: string;

  @ApiProperty({
    description: 'The langue_parler of the Nounu',
    example: 'francais',
  })
  @IsString()
  @IsOptional()
  langue_parler?: string;
}
