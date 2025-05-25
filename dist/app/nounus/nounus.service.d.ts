import { NotificationService } from './../notification/notification.service';
import { Repository } from 'typeorm';
import { ProfilNounus } from './models/nounu.model';
import { CreateNounuDto } from './dtos/create-nounu.dto';
import { UpdateNounuDto } from './dtos/update-nounu.dto';
import { MediaService } from '../media/media.service';
import { Preference } from '../Preference/models/preference.model';
export declare class NounusService {
    private readonly nounuRepository;
    private readonly preferenceRepository;
    private readonly notificationService;
    private readonly mediaService;
    constructor(nounuRepository: Repository<ProfilNounus>, preferenceRepository: Repository<Preference>, notificationService: NotificationService, mediaService: MediaService);
    create(createNounuDto: CreateNounuDto, files: {
        imageNounu: Express.Multer.File[];
        documents: Express.Multer.File[];
        gallery: Express.Multer.File[];
    }): Promise<ProfilNounus>;
    findAllNotCurrentUser(userId: any, page?: number, limit?: number): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateNounuDto: UpdateNounuDto, files: {
        imageNounu: Express.Multer.File[];
        documents: Express.Multer.File[];
        gallery: Express.Multer.File[];
    }): Promise<ProfilNounus>;
    updatePoints(id: string, points: number): Promise<ProfilNounus>;
    decrementPoints(id: string, points: number): Promise<ProfilNounus>;
    remove(id: string): Promise<void>;
    search(searchCriteria: any, page?: number, limit?: number): Promise<{
        data: any[];
        pagination: any;
    }>;
    getNonCertifiedNounus(): Promise<any[]>;
    approveCertification(nounuId: string): Promise<{
        certif: 'Approved' | 'Pending' | 'Rejected';
    }>;
    rejectCertification(nounuId: string): Promise<{
        certif: 'Approved' | 'Pending' | 'Rejected';
    }>;
    pendingCertification(nounuId: string): Promise<{
        certif: 'Approved' | 'Pending' | 'Rejected';
    }>;
    updateStatus(nounuId: string, status: string): Promise<{
        status: string;
    }>;
    ReturnN(datas: any[], preferenceKey: any[]): Promise<any[]>;
    ReturnSearchN(datas: any[], preferenceKey: any[]): Promise<ProfilNounus[]>;
}
