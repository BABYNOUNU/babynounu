import { Module } from '@nestjs/common';
import { NounuController } from './nounu.controller';
import { NounuService } from './nounu.service';
import { Nounu } from './nounu';

@Module({
  controllers: [NounuController],
  providers: [NounuService, Nounu]
})
export class NounuModule {}
