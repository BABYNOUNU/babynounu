import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class SginInAuthDto {
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
}
