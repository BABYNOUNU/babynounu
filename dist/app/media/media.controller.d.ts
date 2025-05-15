import { MediaService } from './media.service';
import { CreateMediaDto } from './dtos/create-media.dto';
import { UpdateMediaDto } from './dtos/update-media.dto';
import { Medias } from './models/media.model';
export declare class MediaController {
    private readonly mediaService;
    constructor(mediaService: MediaService);
    create(createMediaDto: CreateMediaDto, files: {
        test: Express.Multer.File[];
    }): void;
    createDocumentByNounu(userId: string, files: any): Promise<any>;
    findDocumentByUserId(userId: string): Promise<Medias[]>;
    findAll(): Promise<Medias[]>;
    findOne(id: string): Promise<Medias>;
    getGalleryNounus(userId: string): Promise<Medias[]>;
    getDocumentNounus(userId: string): Promise<Medias[]>;
    update(id: string, typeMedia: string, updateMediaDto: UpdateMediaDto): Promise<Medias>;
    remove(id: string): Promise<Medias>;
}
