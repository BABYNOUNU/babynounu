import { UpdateApp } from './models/updateApp.model';
import { Repository } from 'typeorm';
interface CreateUpdateAppDto {
    appName?: string;
    version?: string;
    description?: string;
    isActive?: boolean;
    settings?: Record<string, any>;
}
interface UpdateUpdateAppDto {
    appName?: string;
    version?: string;
    description?: string;
    isActive?: boolean;
    settings?: Record<string, any>;
}
export declare class AdministrateurService {
    private readonly updateAppRepository;
    constructor(updateAppRepository: Repository<UpdateApp>);
    create(createUpdateAppDto: CreateUpdateAppDto): Promise<UpdateApp>;
    findAll(page?: number, limit?: number): Promise<any>;
    findOne(id: number): Promise<UpdateApp>;
    findActive(): Promise<UpdateApp>;
    update(id: number, updateUpdateAppDto: UpdateUpdateAppDto): Promise<UpdateApp>;
    remove(id: number): Promise<{
        message: string;
    }>;
    toggleActive(id: number, isActive: boolean): Promise<UpdateApp>;
    searchByAppName(appName: string, page?: number, limit?: number): Promise<any>;
    findVersionToActive(version: string): Promise<UpdateApp>;
}
export {};
