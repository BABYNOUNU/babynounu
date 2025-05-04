import { Preference } from 'src/app/Preference/models/preference.model';
import { Rooms } from 'src/app/rooms/models/room.model';
import { User } from 'src/app/user/user.model';
export declare class ProfilNounus {
    id: string;
    fullname: string;
    age: string;
    phone: string;
    annees_experience: string;
    tarif_horaire: string;
    status: string;
    tarif_mensuel: string;
    flexibilite_tarifaire: boolean;
    urgences: boolean;
    certif: boolean;
    evaluation_precedentes: string;
    references: string;
    courte_biographie: string;
    preferences: Preference[];
    user: User;
    nounouRooms: Rooms[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
