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
   * Get all notifications for a specific user with pagination.
   * @param userId - ID of the user.
   * @param page - Page number (default: 1).
   * @param limit - Number of items per page (default: 10).
   * @returns A paginated list of notifications with metadata.
   */
  async findAllByUser(userId: string, page: number = 1, limit: number = 10) {
    // Convert page and limit to integers and validate
    const pageNumber = parseInt(page.toString(), 10) || 1;
    const limitNumber = parseInt(limit.toString(), 10) || 10;
    const skip = (pageNumber - 1) * limitNumber;

    // Ensure minimum values
    const validPage = Math.max(1, pageNumber);
    const validLimit = Math.max(1, Math.min(100, limitNumber)); // Max 100 items per page
    const validSkip = (validPage - 1) * validLimit;

    // Get paginated notifications
    const [notifications, totalCount] = await this.notificationRepository.findAndCount({
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
      order: { createdAt: 'DESC' }, // Order by creation date (most recent first)
      skip: validSkip,
      take: validLimit,
    });

    // Transform notifications data
    const transformedNotifications = notifications.map((notify) => {
      return {
        ...notify,
        photo: notify.user.medias.length > 0 
          ? notify.user.medias.find((media) => media.type_media.slug === 'image-profil') 
          : null,
        profil: notify.user.nounu.length > 0
          ? notify.user.nounu[0]
          : notify.user.parent[0],
      };
    });

    // Get unread count
    const unreadCount = await this.notificationRepository.count({
      where: { sender: { id: userId }, isRead: false },
    });

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / validLimit);
    const hasNextPage = validPage < totalPages;
    const hasPreviousPage = validPage > 1;

    return {
      data: transformedNotifications,
      pagination: {
        total: totalCount,
        page: validPage,
        limit: validLimit,
        totalPages,
        hasNextPage,
        hasPrevPage: hasPreviousPage,
      },
      unreadCount,
    };
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

    return this.findAllByUser(senderUserId);
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
