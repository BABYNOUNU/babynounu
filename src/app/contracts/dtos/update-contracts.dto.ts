import { IsNumber, IsPositive, IsInt } from 'class-validator';
export class UpdateContractDto {
    @IsNumber()
    @IsPositive()
    price?: number;
  
    @IsNumber()
    @IsInt()
    @IsPositive()
    duration?: number;
  }