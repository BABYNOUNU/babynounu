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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('notifications') // Tag pour regrouper les endpoints dans Swagger UI
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationsService: NotificationService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a notification' }) // Description de l'opération
  @ApiBody({ type: CreateNotificationDto }) // Documenter le corps de la requête
  @ApiResponse({
    status: 201,
    description: 'Notification created successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @UsePipes(new ValidationPipe())
  async createNotification(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.createNotification(createNotificationDto);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get notifications for a user' }) // Description de l'opération
  @ApiParam({ name: 'userId', type: Number, description: 'ID of the user' }) // Documenter le paramètre de route
  @ApiResponse({
    status: 200,
    description: 'Notifications retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getNotifications(@Param('userId') userId: number) {
    return this.notificationsService.getNotifications(userId);
  }

  @Patch(':id/mark-as-read')
  @ApiOperation({ summary: 'Mark a notification as read' }) // Description de l'opération
  @ApiParam({ name: 'id', type: Number, description: 'ID of the notification' }) // Documenter le paramètre de route
  @ApiResponse({
    status: 200,
    description: 'Notification marked as read',
  })
  @ApiResponse({ status: 404, description: 'Notification not found' })
  async markAsRead(@Param('id') id: number) {
    return this.notificationsService.markAsRead(id);
  }
}