import { IsString, IsOptional, IsArray, IsUUID, IsNotEmpty } from 'class-validator';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  budget_min: string;

  @IsString()
  @IsNotEmpty()
  budget_max: string;

  @IsString()
  @IsNotEmpty()
  service_frequency: string;

  @IsString()
  @IsNotEmpty()
  schedules_available: string;




  @IsUUID()
  @IsOptional()
  user?: string; // ID de l'utilisateur lié
}
