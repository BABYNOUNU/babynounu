import { PreferenceService } from './preference.service';
export declare class PreferenceController {
    private readonly preferenceService;
    constructor(preferenceService: PreferenceService);
    findAll(): Promise<import("./models/preference.model").Preference[]>;
    findOne(id: number): Promise<import("./models/preference.model").Preference>;
}
