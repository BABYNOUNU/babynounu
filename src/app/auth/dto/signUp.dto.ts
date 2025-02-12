import { ApiProperty } from '@nestjs/swagger';
import {
  Allow,
  IS_LENGTH,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class SginUpAuthDto {


  @ApiProperty({
    example: 'bill-pather-9520',
    required: false,
  })
  @Allow()
  slug: string;

  @ApiProperty({
    example: 'rehmat.sayani@gmail.com',
    required: true,
  })
  @IsString({ message: 'Ce champs est requis' })
  @IsEmail({}, { message: 'Email invalide' })
  email: string;

  @ApiProperty({
    example: 'password',
    required: true,
  })
  @IsString({ message: 'Ce champs est requis' })
  @MinLength(8, { message: 'Le mot de passe doit avoir au moins 8 caractères' })
  password: string;

  @ApiProperty({
    example: 'user',
    required: true
  })
  @IsNotEmpty({ message: 'Le role est requis' })
  @IsString({ message: 'Le role doit être une chaine de caractères' })
  role: string;

  @ApiProperty({
    example: 'Nounu',
    required: true
  })
  @IsNotEmpty({ message: 'Type du profil champ est requis' })
  @IsString({ message: 'Type du profil doit être une chaine de caractères' })
  type_profil: string;
}
