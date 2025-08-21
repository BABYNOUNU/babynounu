import { Repository } from 'typeorm';
import { Notification } from './models/notification.model';
import { CreateNotificationDto } from './dtos/create-notification.dto';
export declare class NotificationService {
    private readonly notificationRepository;
    constructor(notificationRepository: Repository<Notification>);
    createNotification(createNotificationDto: CreateNotificationDto): Promise<Notification>;
    findAllByUser(userId: string, page?: number, limit?: number): Promise<{
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
    markAsRead(notificationId: number): Promise<void>;
    markAsReadById(notificationId: number): Promise<void>;
    updateViewByUserId(senderUserId: string): Promise<{
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
    getAllCountByReceiverId(receiverId: string): Promise<number>;
}
