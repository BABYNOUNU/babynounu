import { AdministrateurService } from './administrateur.service';
declare class CreateUpdateAppDto {
    appName?: string;
    version?: string;
    description?: string;
    isActive?: boolean;
    settings?: Record<string, any>;
}
declare class UpdateUpdateAppDto {
    appName?: string;
    version?: string;
    description?: string;
    isActive?: boolean;
    settings?: Record<string, any>;
}
declare class ToggleActiveDto {
    isActive: boolean;
}
export declare class AdministrateurController {
    private readonly administrateurService;
    constructor(administrateurService: AdministrateurService);
    create(createUpdateAppDto: CreateUpdateAppDto): Promise<import("./models/updateApp.model").UpdateApp>;
    findAll(page?: number, limit?: number): Promise<any>;
    findActive(): Promise<import("./models/updateApp.model").UpdateApp>;
    searchByAppName(appName: string, page?: number, limit?: number): Promise<any>;
    checkUpdate(version: string): Promise<import("./models/updateApp.model").UpdateApp>;
    findOne(id: number): Promise<import("./models/updateApp.model").UpdateApp>;
    update(id: number, updateUpdateAppDto: UpdateUpdateAppDto): Promise<import("./models/updateApp.model").UpdateApp>;
    toggleActive(id: number, toggleActiveDto: ToggleActiveDto): Promise<import("./models/updateApp.model").UpdateApp>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
export {};
