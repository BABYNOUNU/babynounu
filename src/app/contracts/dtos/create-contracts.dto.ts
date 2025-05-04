import { IsNumber, IsPositive, IsInt } from 'class-validator';

export class CreateContractDto {

  @IsNumber()
  @IsInt()
  @IsPositive()
  roomId: number;

  @IsNumber()
  @IsInt()
  messageId: number;
}

