import { Notification } from './models/notification.model';
// src/events/events.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NotificationService } from './notification.service';
import { AbonnementService } from '../abonnement/abonnement.service';
import { CreateAbonnementDto } from '../abonnement/dtos/create-abonnement.dto';
import { JobApplicationsService } from '../job-application/job-application.service';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly abonnementService: AbonnementService,
    private readonly notificationService: NotificationService,
    private readonly jobApplicationService: JobApplicationsService,
  ) {}

  // Écouter les connexions des clients
  handleConnection(client: Socket) {
    // console.log(`Client connecté: ${client.id}`);
  }

  // Écouter les déconnexions des clients
  handleDisconnect(client: Socket) {
    // console.log(`Client déconnecté: ${client.id}`);
  }

  // Écouter un événement personnalisé (optionnel)
  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): void {
    console.log(`Message reçu: ${data}`);
    this.server.emit('message', `Réponse du serveur: ${data}`); // Diffuser à tous les clients
  }

  // Vérifie si l'utilisateur a un abonnement actif
  @SubscribeMessage('checkIsAbonnement')
  async CheckIsAbonnement(
    @MessageBody() createAbonnementDto: CreateAbonnementDto,
    @ConnectedSocket() client: Socket,
  ): Promise<any> {
    const isAbonnement =
      await this.abonnementService.createAbonnement(createAbonnementDto);
    console.log(isAbonnement);
    this.server.emit('isAbonnement', isAbonnement); // Diffuser à tous les clients
  }

  // Envoie une notification à l'utilisateur qui a souscrit une offre d'emploi
  @SubscribeMessage('getNotifications')
  async GetNotifications(
    @MessageBody() data: { userId: string },
    @ConnectedSocket() client: Socket,
  ): Promise<any> {
    const notification = await this.notificationService.getNotifications(
      data.userId,
    );

    this.server.emit('notifications', {
      userId: data.userId,
      notifications: notification,
    });
  }


  
  // Mettre à jour la vue des notifications pour un utilisateur
  @SubscribeMessage('updateViewByUserId')
  async UpdateViewByUserId(
    @MessageBody() data: { userId: string },
    @ConnectedSocket() client: Socket,
  ): Promise<any> {
    const notification = await this.notificationService.updateViewByUserId(
      data.userId,
    );
    this.server.emit('notifications', {
      userId: data.userId,
      notifications: notification,
    });
  }
}
