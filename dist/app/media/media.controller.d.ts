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
    findAll(): Promise<Medias[]>;
    findOne(id: string): Promise<Medias>;
    update(id: string, updateMediaDto: UpdateMediaDto): Promise<Medias>;
    remove(id: string): Promise<void>;
}
