import { Repository } from 'typeorm';
import { Medias } from './models/media.model';
import { CreateMediaDto } from './dtos/create-media.dto';
import { UpdateMediaDto } from './dtos/update-media.dto';
import { ParameterService } from '../parameter/parameter.service';
export declare class MediaService {
    private readonly mediaRepository;
    private readonly parameterService;
    constructor(mediaRepository: Repository<Medias>, parameterService: ParameterService);
    create(createMediaDto: CreateMediaDto): Promise<Medias>;
    findOne(id: number): Promise<Medias | undefined>;
    findAll(): Promise<Medias[]>;
    update(id: number, updateMediaDto: UpdateMediaDto): Promise<Medias | undefined>;
    remove(id: number): Promise<void>;
}
