// src/chat/chat.controller.ts
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auh.guard';
import { User } from '../user/user.model';
import { RoomsService } from '../rooms/rooms.service';
import { MessageService } from '../messages/messages.service';


@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(
    private roomService: RoomsService,
    private messageService: MessageService,
  ) {}

  @Get('conversations')
  async getConversations(@Query('userId') userId: string) {
    return this.roomService.getConversationsForUser(userId);
  }

  @Get('messages')
  async getMessages(@Query('roomId') roomId: number) {
    // Vérifier que l'utilisateur a accès à cette conversation
    // const room = await this.roomService.findOne(roomId);
   
      return this.messageService.findByRoom(roomId);
   
  }

  @Get('find-or-create-room')
  async findOrCreateRoom(@Query('parentId') parentId: number, @Query('nounouId') nounouId: number) {
    return this.roomService.findOrCreate(parentId, nounouId);
  }


  @Get('room/:id')
  async findOne(@Query('id') id: number) {
    return this.roomService.findOne(id);
  }

}