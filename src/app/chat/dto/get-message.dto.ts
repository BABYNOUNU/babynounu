import { ApiProperty } from '@nestjs/swagger';

export class GetMessagesDto {
  @ApiProperty({ example: 1, description: 'ID of the conversation' })
  conversationId: number;
}