import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dtos/create-notification.dto';
export declare class NotificationController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationService);
    createNotification(createNotificationDto: CreateNotificationDto): Promise<import("./models/notification.model").Notification>;
    getNotifications(userId: string, page?: number, limit?: number): Promise<{
        data: {
            photo: import("../media/models/media.model").Medias;
            profil: import("../nounus/models/nounu.model").ProfilNounus | import("../parent/models/parent.model").ProfilParents;
            id: number;
            type: string;
            job: import("../job/models/job.model").Job;
            message: string;
            tolinkId: string;
            isRead: boolean;
            user: import("../user/user.model").User;
            sender: import("../user/user.model").User;
            isActions: boolean;
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        }[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
            hasNextPage: boolean;
            hasPrevPage: boolean;
        };
        unreadCount: number;
    }>;
    markAsRead(id: number): Promise<void>;
}
