export declare const storageMedia: import("multer").StorageEngine;
export declare const handleFileError: (err: any, req: any, res: any, next: any) => any;
export declare const fileFilterMedia: (req: any, file: any, cb: any) => any;
export declare const LimiterMedia: {
    fileSize: number;
};
