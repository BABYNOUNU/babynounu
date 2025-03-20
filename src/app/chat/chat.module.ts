import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatProviders } from './chat';
import { DatabaseModule } from 'src/database/database.module';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [DatabaseModule],
  controllers: [ChatController],
  providers: [ChatService, ...ChatProviders, ChatGateway],
})
export class ChatModule {}
