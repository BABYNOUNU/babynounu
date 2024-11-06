import { Parents } from './models/parent.model';
import { Repository } from 'typeorm';
export declare class ParentService {
    private ParentsRepository;
    constructor(ParentsRepository: Repository<Parents>);
    Parents(): Promise<Parents[]>;
    Parent(ParentsWhereUniqueInput: any): Promise<Parents | null>;
    CreateParent(): Promise<Parents>;
    UpdateParent(): Promise<Parents>;
    DeleteParent(where: any): Promise<{
        message: string;
    }>;
}
