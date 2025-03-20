import { Notification } from './models/notification.model';
// src/events/events.gateway.ts
import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
import { HOST } from 'src/database/database.providers';
  
  @WebSocketGateway({
    cors: true,
  })
  export class NotificationGateway {
    @WebSocketServer()
    server: Server;
  
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
    handleMessage(@MessageBody() data: string, @ConnectedSocket() client: Socket): void {
      console.log(`Message reçu: ${data}`);
      this.server.emit('message', `Réponse du serveur: ${data}`); // Diffuser à tous les clients
    }
  }