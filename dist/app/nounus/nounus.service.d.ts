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
    findAllNotCurrentUser(userId: any): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: number): Promise<any>;
    update(id: string, updateNounuDto: UpdateNounuDto, files: {
        imageNounu: Express.Multer.File[];
        documents: Express.Multer.File[];
        gallery: Express.Multer.File[];
    }): Promise<Nounus>;
    remove(id: number): Promise<void>;
    search(searchCriteria: any): Promise<any[]>;
    getNonCertifiedNounus(): Promise<any[]>;
    approveCertification(nounuId: number): Promise<{
        certif: boolean;
    }>;
    updateStatus(nounuId: number, status: string): Promise<{
        status: string;
    }>;
    ReturnN(datas: any[], preferenceKey: any[]): Promise<any[]>;
    ReturnSearchN(datas: any[], preferenceKey: any[]): Promise<Nounus[]>;
}
