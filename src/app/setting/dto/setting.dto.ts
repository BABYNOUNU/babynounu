import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsEmail, IsString } from 'class-validator';

export class SettingDto {
  @ApiProperty({
    example: 'setting name',
    required: true,
  })
  @IsString()
  name: string;

  // @ApiProperty({
  //   example: 'setting-slug-0254',
  //   required: true,
  // })
  @Allow()
  slug: string;

  @ApiProperty({
    example: 'this is my setting description',
    required: false,
  })
  @IsString()
  description: string;
}
