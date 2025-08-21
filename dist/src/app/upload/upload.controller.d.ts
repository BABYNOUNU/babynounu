export declare class UploadController {
    uploadFile(file: Express.Multer.File): {
        message: string;
        file: {
            originalname: string;
            filename: string;
            path: string;
            mimetype: string;
        };
    };
}
