// src/profiles/dto/create-profile.dto.ts

import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateProfileDto {
   @IsNotEmpty()
   @IsString()
   firstName: string;

   @IsNotEmpty()
   @IsString()
   lastName: string;

   @IsNotEmpty()
   @IsString()
   bio: string;

   @IsNotEmpty()
   @IsNumber()
   level: number;

   @IsNotEmpty()
   @IsNumber()
   userId: number;

   @IsNotEmpty()
   @IsNumber()
   typeId: number;

   @IsNotEmpty()
   @IsNumber()
   preferenceId: number;
}