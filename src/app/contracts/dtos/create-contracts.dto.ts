import { IsNumber, IsPositive, IsInt } from 'class-validator';

export class CreateContractDto {
  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsInt()
  @IsPositive()
  duration: number;

  @IsNumber()
  @IsInt()
  nounuId: number;

  @IsNumber()
  @IsInt()
  parentId: number;
}

