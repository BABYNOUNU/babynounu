import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { CreateChatMessageDto } from './dto/create-chat.dto';

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('send')
  @ApiOperation({ summary: 'Envoyer un message' })
  @ApiResponse({ status: 201, description: 'Message envoyé avec succès' })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  async sendMessage(@Body() sendMessageDto: CreateChatMessageDto) {
    return this.chatService.saveMessage({
      senderId: sendMessageDto.senderId,
      roomId: sendMessageDto.roomId,
      content: sendMessageDto.content,
    });
  }

  @Post('conversations/create')
  @ApiOperation({ summary: 'Créer une conversation' })
  @ApiResponse({ status: 201, description: 'Conversation créée avec succès' })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  async createConversation(
    @Body() createConversationDto: CreateConversationDto,
  ) {
    return this.chatService.createConversation(createConversationDto);
  }

  @Get('conversations/:conversationId')
  @ApiOperation({ summary: 'Obtenir une conversation' })
  @ApiResponse({ status: 200, description: 'Conversation retournée' })
  @ApiResponse({ status: 404, description: 'Conversation non trouvée' })
  async getConversation(
    @Param('conversationId') room: number,
    openChatSenderId: string,
  ) {
    return this.chatService.getConversation(room, openChatSenderId);
  }

  @Get('conversations/user/:userId')
  @ApiOperation({ summary: 'Lister les conversations par utilisateur' })
  @ApiResponse({
    status: 200,
    description: 'Liste des conversations par utilisateur retournée',
  })
  async getConversationsByUser(@Param('userId') userId: string) {
    return this.chatService.getAllConversationsByUser(userId);
  }
}
