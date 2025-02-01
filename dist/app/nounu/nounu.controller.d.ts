import { NounuService } from './nounu.service';
import { CreateNounuDto } from './dto/create-nounu.dto';
import { UpdateNounuDto } from './dto/update-nounu.dto';
export declare class NounuController {
    private readonly nounuService;
    constructor(nounuService: NounuService);
    create(createNounuDto: CreateNounuDto, files: {
        profil_image?: Express.Multer.File[];
        document?: Express.Multer.File[];
        gallery?: Express.Multer.File[];
    }): Promise<import("./models/nounu.model").Nounus>;
    findAll(userId: string): Promise<import("./models/nounu.model").Nounus[]>;
    findOne(id: string): Promise<import("./models/nounu.model").Nounus>;
    update(id: string, updateNounuDto: UpdateNounuDto): Promise<import("./models/nounu.model").Nounus>;
    remove(id: string): Promise<void>;
}
