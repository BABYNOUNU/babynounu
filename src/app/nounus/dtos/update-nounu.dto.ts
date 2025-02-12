// fullName: string;
// age: string;
// phone: string;
// annees_experience: string;
// urgences: string;
// tarif_horaire: string;
//     tarif_mensuel: string;
//     flexibilite_tarifaire: string;
//     courte_biographie: string;

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateNounuDto {
  @ApiProperty({ description: 'The full name of the Nounu', example: 'Updated Nounu' })
  @IsString()
  @IsOptional()
  fullName?: string;

  @ApiProperty({ description: 'The age of the Nounu', example: '30' })
  @IsString()
  @IsOptional()
  age?: string;

  @ApiProperty({ description: 'The phone number of the Nounu', example: '123-456-7890' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ description: 'The years of experience of the Nounu', example: '5' })
  @IsString()
  @IsOptional()
  annees_experience?: string;

  @ApiProperty({ description: 'Emergency services availability', example: true })
  @IsString()
  @IsOptional()
  urgences?: string;

  @ApiProperty({ description: 'Hourly rate of the Nounu', example: '25.00' })
  @IsString()
  @IsOptional()
  tarif_horaire?: string;

  @ApiProperty({ description: 'Monthly rate of the Nounu', example: '1000.00' })
  @IsString()
  @IsOptional()
  tarif_mensuel?: string;

  @ApiProperty({ description: 'Rate flexibility', example: true })
  @IsString()
  @IsOptional()
  flexibilite_tarifaire?: string;

  @ApiProperty({ description: 'Short biography of the Nounu', example: 'Experienced child caregiver' })
  @IsString()
  @IsOptional()
  courte_biographie?: string;
}