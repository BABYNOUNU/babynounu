import { ParentsService } from './parent.service';
export declare class ParentController {
    private readonly parentService;
    constructor(parentService: ParentsService);
    GetParents(): void;
    GetParent(id: string): Promise<any>;
    Create(createParentDto: any, files: any): Promise<import("./models/parent.model").Parents>;
}
