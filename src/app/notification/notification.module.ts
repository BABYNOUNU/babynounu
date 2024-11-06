import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { Notification } from './notification';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService, Notification]
})
export class NotificationModule {}
