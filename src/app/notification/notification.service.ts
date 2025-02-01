import { NotificationGateway } from './notification.gateway';
import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Notification } from './models/notification.model';
import { CreateNotificationDto } from './dtos/create-notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @Inject('NOTIFICATION_REPOSITORY')
    private readonly notificationRepository: Repository<Notification>,
    private readonly notificationGateway: NotificationGateway,
  ) {}

  /**
   * Create a new notification.
   * @param createNotificationDto - Data to create the notification.
   * @returns The created notification.
   */
  async createNotification(createNotificationDto: CreateNotificationDto) {
    const notification = this.notificationRepository.create({
      type: createNotificationDto.type,
      message: createNotificationDto.message,
      user: { id: createNotificationDto.userId },
      isRead: createNotificationDto.is_read,
      sender: { id: createNotificationDto.senderUserId },
    });

    const saveNotification =
      await this.notificationRepository.save(notification);

    if (!saveNotification) {
      throw new NotFoundException('Notification not saved');
    }

    this.notificationGateway.server
      .emit('notification', saveNotification);

    return saveNotification;
  }

  /**
   * Get all notifications for a specific user.
   * @param userId - ID of the user.
   * @returns A list of notifications.
   */
  async getNotifications(userId: number) {
    console.log(userId);
    return await this.notificationRepository.find({
      where: { user: { id: userId.toString() } },
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Mark a notification as read.
   * @param notificationId - ID of the notification.
   * @returns void
   */
  async markAsRead(notificationId: number) {
    await this.notificationRepository.update(notificationId, { isRead: true });
  }
}
