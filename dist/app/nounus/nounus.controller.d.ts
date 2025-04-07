import { NounusService } from './nounus.service';
import { CreateNounuDto } from './dtos/create-nounu.dto';
import { UpdateNounuDto } from './dtos/update-nounu.dto';
import { Nounus } from './models/nounu.model';
import { SearchNounuCriteriaDto } from './dtos/search-nounu-criteria.dto';
export declare class NounusController {
    private readonly nounuService;
    constructor(nounuService: NounusService);
    create(createNounuDto: CreateNounuDto, files: any): Promise<Nounus>;
    findAllNotCurrentUser(userId: string): Promise<Nounus[]>;
    findAll(): Promise<Nounus[]>;
    getNonCertifiedNounus(): Promise<Nounus[]>;
    findOne(id: number): Promise<Nounus>;
    updateStatus(id: number, { status }: {
        status: string;
    }): Promise<{
        status: string;
    }>;
    update(id: string, updateNounuDto: UpdateNounuDto, files: any): Promise<Nounus>;
    approveCertification(id: number): Promise<{
        certif: boolean;
    }>;
    remove(id: number): Promise<void>;
    searchNounu(searchCriteria: SearchNounuCriteriaDto): Promise<any[]>;
}
