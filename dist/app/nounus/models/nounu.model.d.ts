import { Contracts } from 'src/app/contracts/models/contracts.model';
import { Preference } from 'src/app/Preference/models/preference.model';
import { Room } from 'src/app/rooms/models/room.model';
import { User } from 'src/app/user/user.model';
export declare class Nounus {
    id: number;
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
    nounouRooms: Room[];
    contracts: Contracts[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
