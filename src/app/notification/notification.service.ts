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
      job: { id: createNotificationDto.jobId },
    });

    const saveNotification =
      await this.notificationRepository.save(notification);

    if (!saveNotification) {
      throw new NotFoundException('Notification not saved');
    }

    return saveNotification;
  }

  /**
   * Get all notifications for a specific user.
   * @param userId - ID of the user.
   * @returns A list of notifications.
   */
  async getNotifications(userId: string) {
    let notifications = await this.notificationRepository.find({
      where: { sender: { id: userId } },
      relations: {
        user: {
          nounu: true,
          parent: true,
        },
        job: true,
      },
    });

    notifications = notifications.map((notify) => {
      return {
        ...notify,
        profil:
          notify.user.nounu.length > 0
            ? notify.user.nounu[0]
            : notify.user.parent[0],
      };
    });

    const count = await this.notificationRepository.count({
      where: { sender: { id: userId }, isRead: false },
    });
    return { notifications, count };
  }

  /**
   * Mark a notification as read.
   * @param notificationId - ID of the notification.
   * @returns void
   */
  async markAsRead(notificationId: number) {
    await this.notificationRepository.update(notificationId, { isRead: true });
  }

  /**
   * Update view by user id.
   * @param userId - ID of the user.
   * @returns void
   */
  async updateViewByUserId(senderUserId: string) {
    await this.notificationRepository
      .createQueryBuilder('notification')
      .innerJoin('notification.sender', 'sender')
      .update(Notification)
      .set({ isRead: true })
      .where('sender.id = :senderUserId', { senderUserId })
      .execute();

    return this.getNotifications(senderUserId);
  }
}
