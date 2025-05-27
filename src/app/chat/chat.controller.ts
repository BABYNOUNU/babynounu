// src/chat/chat.controller.ts
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auh.guard';
import { User } from '../user/user.model';
import { MessageService } from '../messages/messages.service';
import { GetUser } from '../auth/getUser';
import { RoomsService } from '../rooms/rooms.service';

@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(
    private roomService: RoomsService,
    private messageService: MessageService,
  ) {}

  @Get('messages')
  async getMessages(@Query('roomId') roomId: number) {
    // Vérifier que l'utilisateur a accès à cette conversation
    // const room = await this.roomService.findOne(roomId);
    return this.messageService.findByRoom(roomId);
  }

  @Get('conversations')
  async getUserConversations(@GetUser() user: User) {
    console.log(user)
    return this.roomService.getUserConversations(user.id);
  }

  @Get('find-or-create-room')
  async createOrGetRoom(
    @GetUser() user: User,
    @Query('nounouId') nounouId: string,
    @Query('parentId') parentId: string,
  ) {
    return this.roomService.createOrGetRoom(user.id, parentId, nounouId);
  }

  @Get('unread-total')
  async getTotalUnreadCount(@GetUser() user: User) {
    return this.roomService.getTotalUnreadCount(user.id);
  }

  @Get('room/:id')
  async getRoom(@GetUser() user: any,
  @Param('id') roomId: number) {
    return this.roomService.getRoom(roomId, user);
  }

  @Get(':id/unread')
  async getRoomUnreadCount(@Param('id') roomId: number, @GetUser() user: User) {
    return this.roomService.getRoomUnreadCount(roomId, user.id);
  }

  @Post(':id/mark-as-read')
  async markAsRead(@Param('id') roomId: number, @GetUser() user: User) {
    return this.roomService.resetUnreadCount(roomId, user.id);
  }
}
