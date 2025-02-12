import { Preference } from 'src/app/Preference/models/preference.model';
import { User } from 'src/app/user/user.model';
export declare class Nounus {
    id: number;
    fullname: string;
    age: string;
    phone: string;
    annees_experience: string;
    tarif_horaire: string;
    tarif_mensuel: string;
    flexibilite_tarifaire: boolean;
    urgences: boolean;
    evaluation_precedentes: string;
    references: string;
    courte_biographie: string;
    preferences: Preference[];
    user: User;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
