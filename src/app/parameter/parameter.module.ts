import { Module , Inject } from '@nestjs/common';
import { ParameterController } from './parameter.controller';
import { ParameterService } from './parameter.service';
import { ParameterProviders } from './parameter';
import { DatabaseModule } from 'src/database/database.module';
import { MediaService } from '../media/media.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ParameterController],
  providers: [ParameterService, ...ParameterProviders],
  exports: [ParameterService],
})
export class ParameterModule {}
