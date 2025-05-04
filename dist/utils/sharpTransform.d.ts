import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as sharp from 'sharp';
export declare class SharpDiskInterceptor implements NestInterceptor {
    private options;
    private readonly logger;
    constructor(options: {
        fields: string[];
        resizeOptions: {
            width: number;
            height: number;
            fit?: keyof sharp.FitEnum;
            quality?: number;
        };
    });
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>;
}
export declare const SharpTransform: (options: {
    fields: string[];
    resizeOptions: {
        width: number;
        height: number;
        fit?: keyof sharp.FitEnum;
        quality?: number;
    };
}) => SharpDiskInterceptor;
