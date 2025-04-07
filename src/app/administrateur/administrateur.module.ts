import { Module } from '@nestjs/common';
import { AdministrateurController } from './administrateur.controller';
import { AdministrateurService } from './administrateur.service';
import { Administrateur } from './administrateur';

@Module({
  controllers: [AdministrateurController],
  providers: [AdministrateurService, Administrateur]
})
export class AdministrateurModule {}
