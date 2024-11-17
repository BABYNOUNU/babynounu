import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsEmail, IsString } from 'class-validator';

export class RoleDto {
  
  @Allow()
  slug: string;

  @ApiProperty({
    example: 'Admin',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: "C'est le role Adminstrateur",
    required: true,
  })
  @IsString()
  description: string;
}
