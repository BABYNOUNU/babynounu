import { Module } from '@nestjs/common';
import { AdministrateurController } from './administrateur.controller';
import { AdministrateurService } from './administrateur.service';
import { AdministrateurProviders } from './administrateur';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AdministrateurController],
  providers: [AdministrateurService, ...AdministrateurProviders]
})
export class AdministrateurModule {}
