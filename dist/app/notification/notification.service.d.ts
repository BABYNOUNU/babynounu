import { Repository } from 'typeorm';
import { Notification } from './models/notification.model';
import { CreateNotificationDto } from './dtos/create-notification.dto';
export declare class NotificationService {
    private readonly notificationRepository;
    constructor(notificationRepository: Repository<Notification>);
    createNotification(createNotificationDto: CreateNotificationDto): Promise<Notification>;
    getNotifications(userId: number): Promise<Notification[]>;
    markAsRead(notificationId: number): Promise<void>;
}
