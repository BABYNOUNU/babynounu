import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dtos/create-notification.dto';
export declare class NotificationController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationService);
    createNotification(createNotificationDto: CreateNotificationDto): Promise<import("./models/notification.model").Notification>;
    getNotifications(userId: string): Promise<{
        notifications: import("./models/notification.model").Notification[];
        count: number;
    }>;
    markAsRead(id: number): Promise<void>;
}
