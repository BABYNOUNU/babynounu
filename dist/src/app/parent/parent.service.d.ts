import { MediaService } from './../media/media.service';
import { Repository } from 'typeorm';
import { ProfilParents } from './models/parent.model';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { Preference } from '../Preference/models/preference.model';
import { NounusService } from '../nounus/nounus.service';
export declare class ParentsService {
    private readonly parentsRepository;
    private readonly preferenceRepository;
    private readonly mediaService;
    private readonly nounuService;
    constructor(parentsRepository: Repository<ProfilParents>, preferenceRepository: Repository<Preference>, mediaService: MediaService, nounuService: NounusService);
    findAll(userId: any, page?: number, limit?: number): Promise<any>;
    findOne(id: string): Promise<any>;
    create(createParentDto: CreateParentDto, files: {
        imageParent: Express.Multer.File[];
    }): Promise<ProfilParents>;
    update(id: string, updateParentDto: UpdateParentDto, files: {
        imageParent: Express.Multer.File[];
    }): Promise<ProfilParents>;
    remove(id: string): Promise<void>;
    search(searchCriteria: any, page?: number, limit?: number): Promise<{
        data: any[];
        pagination: any;
    }>;
}
