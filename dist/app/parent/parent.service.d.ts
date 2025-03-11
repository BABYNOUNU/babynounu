import { MediaService } from './../media/media.service';
import { Repository } from 'typeorm';
import { Parents } from './models/parent.model';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { Preference } from '../Preference/models/preference.model';
import { NounusService } from '../nounus/nounus.service';
export declare class ParentsService {
    private readonly parentsRepository;
    private readonly preferenceRepository;
    private readonly mediaService;
    private readonly nounuService;
    constructor(parentsRepository: Repository<Parents>, preferenceRepository: Repository<Preference>, mediaService: MediaService, nounuService: NounusService);
    findAll(): Promise<Parents[]>;
    findOne(id: string): Promise<any>;
    create(createParentDto: CreateParentDto, files: {
        imageParent: Express.Multer.File[];
    }): Promise<Parents>;
    update(id: string, updateParentDto: UpdateParentDto, files: {
        imageParent: Express.Multer.File[];
    }): Promise<Parents>;
    remove(id: string): Promise<void>;
    search(searchCriteria: any): Promise<any[]>;
}
