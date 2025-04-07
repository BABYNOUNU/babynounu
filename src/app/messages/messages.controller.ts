// src/message/message.controller.ts
import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Put,
    Query,
    ParseIntPipe,
  } from '@nestjs/common';
  import { MessageService } from './messages.service';
  import { Message } from './models/message.model';
  import { UserController } from '../user/user.controller';
  
  @Controller('messages')
  export class MessageController {
    constructor(private readonly messageService: MessageService) {}
  
    @Post()
    async createMessage(
      @Body('content') content: string,
      @Body('roomId', ParseIntPipe) roomId: number,
      @Body('senderId', ParseIntPipe) senderId: number,
    ): Promise<Message> {
      return this.messageService.create({ content, roomId, senderId });
    }
  
    @Get('room/:roomId')
    async getMessagesByRoom(
      @Param('roomId', ParseIntPipe) roomId: number,
    ): Promise<Message[]> {
      return this.messageService.findByRoom(roomId);
    }
  
    @Put('read/:roomId')
    async markMessagesAsRead(
      @Param('roomId', ParseIntPipe) roomId: number,
      @Query('userId', ParseIntPipe) userId: number,
    ): Promise<void> {
      return this.messageService.markMessagesAsRead(roomId, userId);
    }
  
    @Get('unread-count')
    async getUnreadCount(
      @Query('userId', ParseIntPipe) userId: number,
      @Query('role') role: 'parent' | 'nounou' | 'admin',
    ): Promise<number> {
      return this.messageService.getUnreadCountForUser(userId, role);
    }
  
    @Get('last-message/:roomId')
    async getLastMessage(
      @Param('roomId', ParseIntPipe) roomId: number,
    ): Promise<Message | null> {
      return this.messageService.getLastMessageForRoom(roomId);
    }
  }