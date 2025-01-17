import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dtos/create-notification.dto';
export declare class NotificationController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationService);
    createNotification(createNotificationDto: CreateNotificationDto): Promise<import("./models/notification.model").Notification>;
    getNotifications(userId: number): Promise<import("./models/notification.model").Notification[]>;
    markAsRead(id: number): Promise<void>;
}
