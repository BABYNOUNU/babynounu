import { ParentService } from './parent.service';
import { CreateParentDto } from './dto/create-parent.dto';
export declare class ParentController {
    private readonly parentService;
    constructor(parentService: ParentService);
    GetParents(): void;
    GetParent(id: number): Promise<import("./models/parent.model").Parents>;
    Create(createParentDto: CreateParentDto, files: {
        profil_image?: Express.Multer.File[];
    }): Promise<import("./models/parent.model").Parents>;
    UpdateParent(): void;
    DeleteParent(id: number): void;
}
