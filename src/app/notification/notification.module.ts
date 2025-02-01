import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { NotificationProviders } from './notification';
import { DatabaseModule } from 'src/database/database.module';
import { NotificationGateway } from './notification.gateway';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationGateway, ...NotificationProviders]
})
export class NotificationModule {}
