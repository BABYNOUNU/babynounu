import { diskStorage } from 'multer';
import { extname } from 'path';

export const storageMedia = diskStorage({
  destination: './uploads', // Where to store files temporarily
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = extname(file.originalname);
    const filename = `${file.originalname.replace(ext, '')}-${uniqueSuffix}${ext}`;
    callback(null, filename);
  },
});

// Gérer les erreurs ailleurs dans votre code si nécessaire
// Exemple : middleware pour capturer les erreurs
export const handleFileError = (err, req, res, next) => {
  if (err) {
    console.error('Erreur lors du traitement du fichier :', err.message);
    return res
      .status(400)
      .json({ message: 'Erreur lors du téléchargement du fichier.' });
  }
  next();
};

export const fileFilterMedia = (req, file, cb) => {
  if (!file.mimetype.startsWith('image/')) {
    return cb(new Error('Seulement les images sont autorisées'), false);
  }
  cb(null, true);
};

export const LimiterMedia = {
  fileSize: 1024 * 1024 * 5, // Limite de taille de fichier (5MB)
};
