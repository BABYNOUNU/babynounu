import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NotificationService } from './notification.service';
import { AbonnementService } from '../abonnement/abonnement.service';
import { CreateAbonnementDto } from '../abonnement/dtos/create-abonnement.dto';
export declare class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly notificationService;
    private readonly abonnementService;
    server: Server;
    constructor(notificationService: NotificationService, abonnementService: AbonnementService);
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleMessage(data: string, client: Socket): void;
    CheckIsAbonnement(createAbonnementDto: CreateAbonnementDto, client: Socket): Promise<any>;
    GetNotifications(data: {
        userId: string;
    }, client: Socket): Promise<any>;
    UpdateViewByUserId(data: {
        userId: string;
    }, client: Socket): Promise<any>;
    GetAllCountByReceiverId(data: {
        receiverId: string;
    }, client: Socket): Promise<any>;
}
