import { ApiProperty } from '@nestjs/swagger';

export class CreateAbonnementDto {
  @ApiProperty({ example: 'uuid-paiement', description: 'ID du paiement associé' })
  paiementId?: string;

  @ApiProperty({ example: 'uuid-type-abonnement', description: 'ID du type d\'abonnement' })
  typeId?: string;

  @ApiProperty({ example: '1234567890', description: 'ID de la transaction' })
  transactionId: string;

  @ApiProperty({ example: 'uuid-user', description: 'ID de l\'utilisateur' })
  userId: string;
}