import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdministrateurController } from './administrateur.controller';
import { AdministrateurService } from './administrateur.service';
import { UpdateApp } from './models/updateApp.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UpdateApp
    ])
  ],
  controllers: [AdministrateurController],
  providers: [AdministrateurService],
  exports: [AdministrateurService, TypeOrmModule]
})
export class AdministrateurModule {}
