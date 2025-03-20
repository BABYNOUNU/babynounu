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

@WebSocketGateway({
  cors: { origin: '*' },
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
  async handleJoinRoom(
    @MessageBody() roomId: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(roomId);
    const messages = await this.chatService.getMessages(+roomId);
    this.server.to(roomId).emit('loadMessages', messages);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody()
    data: {
      senderId: string;
      content: string;
      roomId: string;
      receiverId?: string;
    },
    @ConnectedSocket() client: Socket,
  ) {
    const { senderId, content, roomId, receiverId } = data;
    console.log(roomId);
    const message = await this.chatService.saveMessage({
      senderId,
      content,
      roomId,
    });
  
    // Émettre l'événement 'newMessage' à tous les utilisateurs de la room
    console.log(this.server)
    this.server.emit('newMessage', message);
  }

  @SubscribeMessage('typing')
  async handleTyping(
    @MessageBody() data: { sender: string; roomId: string },
    @ConnectedSocket() client: Socket,
  ) {
    this.server.emit('typing', {user: data.sender, roomId: data.roomId});
  }

  @SubscribeMessage('getAllConversationByUser')
  async getAllConversationByUser(
    @MessageBody() userId: string,
    @ConnectedSocket() client: Socket,
  ) {
    const conversations =
      await this.chatService.getAllConversationsByUser(userId);
    client.emit('allConversations', conversations);
  }

  @SubscribeMessage('getConversation')
  async getConversation(
    @MessageBody() data: { roomId: number; openChatSenderId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { roomId, openChatSenderId } = data;
    const conversation = await this.chatService.getConversation(
      roomId,
      openChatSenderId,
    );
    client.emit('conversation', conversation);
  }

  @SubscribeMessage('updateViewMessage')
  async updateViewMessage(
    @MessageBody() data: { roomId: string; receiverId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { roomId, receiverId } = data;
    await this.chatService.updateViewMessage(receiverId, +roomId);
    this.server.to(roomId).emit('updateViewMessage', {roomIdMessage: roomId});
  }

  

  @SubscribeMessage('getCountMessageByReceiverId')
  async getCountMessageByReceiverId(
    @MessageBody() data: { roomId: string; receiverId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { roomId, receiverId } = data;
    const count = await this.chatService.getCountMessageByReceiverId(
      receiverId,
      +roomId,
    );
    client.emit('countMessageByReceiverId', count);
  }
}
