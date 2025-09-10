// src/app/paiement/dtos/update-payment.dto.ts

import { Allow, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdatePaymentDto {
  userId: any;

  @IsNumber()
  amount: number;

  @Allow()
  transaction_id: string;

  @Allow()
  payment_token: any;

  @Allow()
  currency: string;

  @Allow()
  description: string;

  @Allow()
  notify_url: string;

  @Allow()
  return_url: string;

  @Allow()
  metadata: string;

  @Allow()
  paymentMethod: string;

  @Allow()
  status: string;

  @Allow()
  operator_id: any;
}
