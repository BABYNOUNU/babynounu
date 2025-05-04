import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Not, Repository } from 'typeorm';
import { Notification } from './models/notification.model';
import { CreateNotificationDto } from './dtos/create-notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @Inject('NOTIFICATION_REPOSITORY')
    private readonly notificationRepository: Repository<Notification>,
    // private readonly notificationGateway: NotificationGateway,
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
      tolinkId: createNotificationDto.tolinkId
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
          medias: {
            type_media: true
          },
          nounu: true,
          parent: true,
        },
        job: true,
      },
    });

    notifications = notifications.map((notify) => {
      return {
        ...notify,
        photo: notify.user.medias.length > 0 ? notify.user.medias.find((media) => media.type_media.slug === 'image-profil') : null,
        profil:
          notify.user.nounu.length > 0
            ? notify.user.nounu[0]
            : notify.user.parent[0],
      };
    })?.reverse()

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
    await this.notificationRepository.update({id: notificationId}, { isRead: true });
  }

  /**
   * Mark a notification as read by ID.
   * @param notificationId - ID of the notification.
   * @returns void
   */
  async markAsReadById(notificationId: number) {
    await this.notificationRepository.update(notificationId, { isRead: true });
  }

  /**
   * Update view by user id.
   * @param userId - ID of the user.
   * @returns void
   */
  async updateViewByUserId(senderUserId: string) {
    await this.notificationRepository.update(
      { sender: { id: senderUserId } },
      { isRead: true },
    );

    return this.getNotifications(senderUserId);
  }


/**
 * Get the count of all notifications for a specific receiver that are not read.
 * @param receiverId - ID of the receiver.
 * @returns The count of unread notifications.
 */
async getAllCountByReceiverId(receiverId: string): Promise<number> {
  return await this.notificationRepository.count({
    where: {
      sender: { id: receiverId },
      isRead: false,
    },
  });
}

}
