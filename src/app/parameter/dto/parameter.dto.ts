// src/parameters/dto/create-parameter.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateParameterDto {
  @ApiProperty({ description: 'Nom du paramètre' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Type de paramètre' })
  @IsString()
  @IsNotEmpty()
  type: string;
}
