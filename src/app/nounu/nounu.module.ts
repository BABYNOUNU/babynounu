import { Module } from '@nestjs/common';
import { NounuController } from './nounu.controller';
import { NounuService } from './nounu.service';
import { NounuProviders } from './nounu';
import { DatabaseModule } from 'src/database/database.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    DatabaseModule,
    MulterModule.register({
      dest: './uploads', // Dossier où les fichiers seront stockés
    }),
  ],
  controllers: [NounuController],
  providers: [NounuService, ...NounuProviders],
})
export class NounuModule {}
