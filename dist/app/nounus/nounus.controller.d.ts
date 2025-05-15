import { NounusService } from './nounus.service';
import { CreateNounuDto } from './dtos/create-nounu.dto';
import { UpdateNounuDto } from './dtos/update-nounu.dto';
import { ProfilNounus } from './models/nounu.model';
import { SearchNounuCriteriaDto } from './dtos/search-nounu-criteria.dto';
export declare class NounusController {
    private readonly nounuService;
    constructor(nounuService: NounusService);
    create(files: any, createProfilNounusDto: CreateNounuDto): Promise<ProfilNounus>;
    findAllNotCurrentUser(userId: string): Promise<ProfilNounus[]>;
    findAll(): Promise<ProfilNounus[]>;
    getNonCertifiedNounus(): Promise<ProfilNounus[]>;
    findOne(id: string): Promise<ProfilNounus>;
    updateStatus(id: string, { status }: {
        status: string;
    }): Promise<{
        status: string;
    }>;
    update(id: string, updateNounuDto: UpdateNounuDto, files: any): Promise<ProfilNounus>;
    approveCertification(id: string): Promise<{
        certif: 'Approved' | 'Pending' | 'Rejected';
    }>;
    rejectCertification(id: string): Promise<{
        certif: 'Approved' | 'Pending' | 'Rejected';
    }>;
    pendingCertification(id: string): Promise<{
        certif: 'Approved' | 'Pending' | 'Rejected';
    }>;
    remove(id: string): Promise<void>;
    searchNounu(searchCriteria: SearchNounuCriteriaDto): Promise<any[]>;
}
