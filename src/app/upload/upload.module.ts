import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UploadController } from './upload.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Dossier accessible publiquement
      serveRoot: '/uploads', // URL publique (http://localhost:3000/uploads)
    }), 
  ],
  controllers: [UploadController],
})
export class UploadModule {}
