// src/job-applications/dto/update-job-application.dto.ts

import { IsOptional, IsString } from 'class-validator';

export class UpdateJobApplicationDto {
   @IsOptional()
   @IsString()
   is_apply?: boolean;

   @IsOptional()
   userId?: number;

   @IsOptional()
   jobId?: number;
}