import { Module , Inject } from '@nestjs/common';
import { JobApplicationController } from './job-application.controller';
import { JobApplicationsService } from './job-application.service';
import { JobApplicationProviders } from './job-application';
import { DatabaseModule } from 'src/database/database.module';
import { NotificationService } from '../notification/notification.service';
import { NotificationGateway } from '../notification/notification.gateway';

@Module({
  imports: [DatabaseModule],
  controllers: [JobApplicationController],
  providers: [JobApplicationsService, NotificationService, NotificationGateway, ...JobApplicationProviders]
})
export class JobApplicationModule {}
