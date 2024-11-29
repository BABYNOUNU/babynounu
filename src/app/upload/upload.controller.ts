import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('Upload Files')
@Controller('upload')
export class UploadController {
  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Dossier où les fichiers seront sauvegardés
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname); // Extension du fichier
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        const allowedTypes = ['image/jpeg', 'image/png']; // Autorise seulement JPEG et PNG
        if (!allowedTypes.includes(file.mimetype)) {
          return callback(
            new Error(
              'Type de fichier invalide. Seuls JPEG et PNG sont autorisés.',
            ),
            false,
          );
        }
        callback(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // Taille maximale : 5 MB
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      message: 'Fichier uploadé avec succès.',
      file: {
        originalname: file.originalname,
        filename: file.filename,
        path: file.path,
        mimetype: file.mimetype,
      },
    };
  }
}
