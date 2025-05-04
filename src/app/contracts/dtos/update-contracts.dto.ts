import { IsNumber, IsPositive, IsInt } from 'class-validator';
export class UpdateContractDto {
    @IsNumber()
    @IsPositive()
    roomId?: number;
  
    @IsNumber()
    @IsInt()
    @IsPositive()
    messageId?: number;
  }