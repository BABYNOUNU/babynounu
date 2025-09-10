// src/app/messages/messages.controller.ts
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
  
  @Controller('messages')
  export class MessagesController {
    constructor(private readonly messageService: MessageService) {}
  
    @Post()
    async createMessage(
      @Body('content') content: string,
      @Body('roomId', ParseIntPipe) roomId: number,
      @Body('senderId', ParseIntPipe) senderId: string,
      @Body('isRead', ParseIntPipe) isRead: boolean
    ): Promise<Message> {
      return this.messageService.create({ content, roomId, senderId, isRead, isProposition: false, type: 'Message' });
    }

    
    @Post('proposal-status')
    async updateProposalStatus(
      @Body('roomId', ParseIntPipe) roomId: number,
      @Body('messageId', ParseIntPipe) messageId: number,
      @Body('status') status: 'Accepted' | 'Refused' | 'Pending'
    ): Promise<void> {
      return this.messageService.updateProposalStatus(roomId, messageId, status);
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