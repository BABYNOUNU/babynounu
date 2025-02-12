import { Repository } from 'typeorm';
import { Nounus } from './models/nounu.model';
import { CreateNounuDto } from './dtos/create-nounu.dto';
import { UpdateNounuDto } from './dtos/update-nounu.dto';
import { MediaService } from '../media/media.service';
import { Preference } from '../Preference/models/preference.model';
export declare class NounusService {
    private readonly nounuRepository;
    private readonly preferenceRepository;
    private readonly mediaService;
    constructor(nounuRepository: Repository<Nounus>, preferenceRepository: Repository<Preference>, mediaService: MediaService);
    create(createNounuDto: CreateNounuDto, files: {
        imageNounu: Express.Multer.File[];
        documents: Express.Multer.File[];
        gallery: Express.Multer.File[];
    }): Promise<Nounus>;
    findAll(): Promise<any>;
    findOne(id: number): Promise<any>;
    update(id: number, updateNounuDto: UpdateNounuDto): Promise<Nounus>;
    remove(id: number): Promise<void>;
    ReturnN(datas: any[], preferenceKey: any[]): Promise<Nounus[]>;
}
