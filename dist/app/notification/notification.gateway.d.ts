import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NotificationService } from './notification.service';
import { AbonnementService } from '../abonnement/abonnement.service';
import { CreateAbonnementDto } from '../abonnement/dtos/create-abonnement.dto';
import { JobApplicationsService } from '../job-application/job-application.service';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly abonnementService;
    private readonly notificationService;
    private readonly jobApplicationService;
    server: Server;
    constructor(abonnementService: AbonnementService, notificationService: NotificationService, jobApplicationService: JobApplicationsService);
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
}
