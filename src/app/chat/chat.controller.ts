import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { CreateConversationDto } from './dto/create-conversation.dto';

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('send')
  @ApiOperation({ summary: 'Envoyer un message' })
  @ApiResponse({ status: 201, description: 'Message envoyé avec succès' })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  async sendMessage(@Body() sendMessageDto: CreateConversationDto) {
    return this.chatService.saveMessage(sendMessageDto);
  }

  @Get('history/:conversationId')
  @ApiOperation({ summary: 'Obtenir l’historique d’un chat' })
  @ApiResponse({ status: 200, description: 'Historique du chat retourné' })
  async getChatHistory(@Param('conversationId') conversationId: string) {
    return this.chatService.getMessages(conversationId);
  }

  @Get('list/:userId')
  @ApiOperation({ summary: 'Lister toutes les conversations' })
  @ApiResponse({ status: 200, description: 'Liste des conversations retournée' })
  async listConversations() {
    return this.chatService.listRooms();
  }
}
