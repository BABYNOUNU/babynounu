// src/app/paiement/dtos/create-payment.dto.ts

import { Allow, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePaymentDto {

   @IsNotEmpty()
   userId: any;

   @IsNotEmpty()
   @IsNumber()
   amount: number;

   @IsNotEmpty()
   @IsString()
   transaction_id: string;

   @IsNotEmpty()
   @IsString()
   payment_type: string;

   @Allow()
   payment_token: any;

   @IsNotEmpty()
   @IsString()
   currency: string;

   @IsNotEmpty()
   @IsString()
   description: string;

   @IsNotEmpty()
   @IsString()
   notify_url: string;

   @IsNotEmpty()
   @IsString()
   return_url: string;

   @IsNotEmpty()
   @IsString()
   metadata: string;

   @IsNotEmpty()
   @IsString()
   paymentMethod: string;

   @IsNotEmpty()
   @IsString()
   status: string;

}