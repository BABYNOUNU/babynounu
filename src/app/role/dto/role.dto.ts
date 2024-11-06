import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class RoleDto {
  @ApiProperty({
    example: 'admin-50254',
    required: true,
  })
  @IsString()
  slug: string;

  @ApiProperty({
    example: 'Admin',
    required: true,
  })
  @IsString()
  @IsEmail()
  name: string;
}
