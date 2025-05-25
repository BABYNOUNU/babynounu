import { ParentsService } from './parent.service';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { SearchParentCriteriaDto } from './dto/search-parent-criteria.dto';
export declare class ParentController {
    private readonly parentService;
    constructor(parentService: ParentsService);
    GetParents(page: number, limit: number, userId: string): Promise<any>;
    GetParent(id: string): Promise<any>;
    Create(createParentDto: CreateParentDto, files: any): Promise<import("./models/parent.model").ProfilParents>;
    UpdateParent(id: string, updateParentDto: UpdateParentDto, files: any): Promise<import("./models/parent.model").ProfilParents>;
    DeleteParent(id: number): void;
    searchParent(searchCriteria: SearchParentCriteriaDto, page: number, limit: number): Promise<{
        data: any[];
        pagination: any;
    }>;
}
