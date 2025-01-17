import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
  import { NotificationService } from './notification.service';
  import { CreateNotificationDto } from './dtos/create-notification.dto';
  
  @Controller('notifications')
  export class NotificationController {
    constructor(private readonly notificationsService: NotificationService) {}
  
    @Post()
    @UsePipes(new ValidationPipe())
    async createNotification(@Body() createNotificationDto: CreateNotificationDto) {
      return this.notificationsService.createNotification(createNotificationDto);
    }
  
    @Get(':userId')
    async getNotifications(@Param('userId') userId: number) {
      return this.notificationsService.getNotifications(userId);
    }
  
    @Patch(':id/mark-as-read')
    async markAsRead(@Param('id') id: number) {
      return this.notificationsService.markAsRead(id);
    }
  }