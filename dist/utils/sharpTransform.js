"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SharpDiskInterceptor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharpTransform = exports.SharpDiskInterceptor = void 0;
const common_1 = require("@nestjs/common");
const sharp = require("sharp");
const common_2 = require("@nestjs/common");
const util_1 = require("util");
const stream_1 = require("stream");
const pump = (0, util_1.promisify)(stream_1.pipeline);
let SharpDiskInterceptor = SharpDiskInterceptor_1 = class SharpDiskInterceptor {
    options;
    logger = new common_2.Logger(SharpDiskInterceptor_1.name);
    constructor(options) {
        this.options = options;
    }
    async intercept(context, next) {
        const req = context.switchToHttp().getRequest();
        if (req.files) {
            for (const field of this.options.fields) {
                if (req.files[field]) {
                    for (const file of req.files[field]) {
                        if (!file.path) {
                            throw new Error('Chemin de fichier manquant');
                        }
                        const outputFile = `./uploads/${Date.now()}-${file.originalname.replace(/\.[^/.]+$/, '.jpg')}`;
                        await sharp(file.path)
                            .resize({
                            width: this.options.resizeOptions.width,
                            height: this.options.resizeOptions.height,
                            fit: this.options.resizeOptions.fit || 'cover',
                            withoutEnlargement: true
                        })
                            .jpeg({
                            quality: this.options.resizeOptions.quality || 80,
                            mozjpeg: true
                        })
                            .toFile(outputFile);
                        file.path = outputFile;
                        file.mimetype = 'image/jpeg';
                        file.filename = outputFile.split('/').pop();
                        file.originalname = file.originalname.replace(/\.[^/.]+$/, '.jpg');
                    }
                }
            }
        }
        return next.handle();
    }
};
exports.SharpDiskInterceptor = SharpDiskInterceptor;
exports.SharpDiskInterceptor = SharpDiskInterceptor = SharpDiskInterceptor_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], SharpDiskInterceptor);
const SharpTransform = (options) => new SharpDiskInterceptor(options);
exports.SharpTransform = SharpTransform;
