// src/profiles/dto/update-profile.dto.ts

import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateProfileDto {
   @IsOptional()
   @IsString()
   firstName?: string;

   @IsOptional()
   @IsString()
   lastName?: string;

   @IsOptional()
   @IsString()
   bio?: string;

   @IsOptional()
   @IsNumber()
   level?: number;

   @IsOptional()
   @IsNumber()
   typeParameterId?: number;

   @IsOptional()
   @IsNumber()
   preferenceId?: number;
}