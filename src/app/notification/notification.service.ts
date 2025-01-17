import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Notification } from './models/notification.model';
import { CreateNotificationDto } from './dtos/create-notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @Inject('NOTIFICATION_REPOSITORY')
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  /**
   * Create a new notification.
   * @param createNotificationDto - Data to create the notification.
   * @returns The created notification.
   */
  async createNotification(createNotificationDto: CreateNotificationDto) {
    const notification = this.notificationRepository.create(createNotificationDto);
    return this.notificationRepository.save(notification);
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