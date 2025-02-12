import { Repository } from 'typeorm';
import { Preference } from './models/preference.model';
export declare class PreferenceService {
    private readonly preferenceRepository;
    constructor(preferenceRepository: Repository<Preference>);
    findAll(): Promise<Preference[]>;
    findOne(id: number): Promise<Preference>;
}
