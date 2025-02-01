import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
  } from '@nestjs/websockets';
  import { Socket, Server } from 'socket.io';
  import { ChatService } from './chat.service';
import { HOST } from 'src/database/database.providers';
  
   @WebSocketGateway({
      cors: {
        origin: HOST, // Autoriser uniquement votre domaine en production
        methods: ['GET', 'POST'],
        credentials: true,
      },
    })
  export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
  
    constructor(private readonly chatService: ChatService) {}
  
    async handleConnection(client: Socket) {
      console.log(`Client connected: ${client.id}`);
    }
  
    handleDisconnect(client: Socket) {
      console.log(`Client disconnected: ${client.id}`);
    }
  
    @SubscribeMessage('joinRoom')
    async handleJoinRoom(@MessageBody() room: string, @ConnectedSocket() client: Socket) {
      client.join(room);
      const messages = await this.chatService.getMessages(room);
      client.emit('loadMessages', messages);
    }
  
    @SubscribeMessage('sendMessage')
    async handleMessage(
      @MessageBody() data: { sender: string; content: string; room: string },
      @ConnectedSocket() client: Socket,
    ) {
      const { sender, content, room } = data;
      const message = await this.chatService.saveMessage(sender, content, room);
      this.server.to(room).emit('newMessage', message);
    }
  }
  