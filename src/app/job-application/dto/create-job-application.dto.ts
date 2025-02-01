// src/job-applications/dto/create-job-application.dto.ts

import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateJobApplicationDto {
   @IsNotEmpty()
   @IsBoolean()
   is_apply: boolean;

   @IsNotEmpty()
   userId: number;

   @IsNotEmpty()
   jobId: number;
}