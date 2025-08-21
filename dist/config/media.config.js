"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LimiterMedia = exports.fileFilterMedia = exports.handleFileError = exports.storageMedia = void 0;
const multer_1 = require("multer");
const path_1 = require("path");
exports.storageMedia = (0, multer_1.diskStorage)({
    destination: './uploads',
    filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = (0, path_1.extname)(file.originalname);
        const filename = `${file.originalname.replace(ext, '')}-${uniqueSuffix}${ext}`;
        callback(null, filename);
    },
});
const handleFileError = (err, req, res, next) => {
    if (err) {
        console.error('Erreur lors du traitement du fichier :', err.message);
        return res
            .status(400)
            .json({ message: 'Erreur lors du téléchargement du fichier.' });
    }
    next();
};
exports.handleFileError = handleFileError;
const fileFilterMedia = (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('Seulement les images sont autorisées'), false);
    }
    cb(null, true);
};
exports.fileFilterMedia = fileFilterMedia;
exports.LimiterMedia = {
    fileSize: 1024 * 1024 * 5,
};
