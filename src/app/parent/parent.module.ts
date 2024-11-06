import { Module } from '@nestjs/common';
import { ParentController } from './parent.controller';
import { ParentService } from './parent.service';
import { Parent } from './parent';
import { ParentProviders } from './parent.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ParentController],
  providers: [ParentService, Parent, ...ParentProviders]
})
export class ParentModule {}
