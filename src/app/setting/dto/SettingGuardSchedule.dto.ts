import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SginInAuthDto {
  @ApiProperty({
    example: 'rehmat.sayani@gmail.com',
    required: true,
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password',
    required: true,
  })
  @IsString()
  password: string;
}
