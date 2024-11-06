import { ParentService } from './parent.service';
export declare class ParentController {
    private readonly parentService;
    constructor(parentService: ParentService);
    GetParents(): void;
    GetParent(): void;
    CreateParent(): void;
    UpdateParent(): void;
    DeleteParent(id: number): void;
}
