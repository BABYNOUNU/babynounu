import { NounusService } from './nounus.service';
import { CreateNounuDto } from './dtos/create-nounu.dto';
import { UpdateNounuDto } from './dtos/update-nounu.dto';
import { Nounus } from './models/nounu.model';
import { SearchNounuCriteriaDto } from './dtos/search-nounu-criteria.dto';
export declare class NounusController {
    private readonly nounuService;
    constructor(nounuService: NounusService);
    create(createNounuDto: CreateNounuDto, files: any): Promise<Nounus>;
    findAll(userId: string): Promise<Nounus[]>;
    findOne(id: number): Promise<Nounus>;
    update(id: number, updateNounuDto: UpdateNounuDto, files: any): Promise<Nounus>;
    remove(id: number): Promise<void>;
    searchNounu(searchCriteria: SearchNounuCriteriaDto): Promise<any[]>;
}
