import { User } from 'src/app/user/user.model';
import { Preference } from 'src/app/Preference/models/preference.model';
import { Rooms } from 'src/app/rooms/models/room.model';
export declare class ProfilParents {
    id: string;
    fullname: string;
    adresse_mail: string;
    phone: string;
    number_of_children: string;
    budget_estimated: string;
    preferences: Preference[];
    user: User;
    parentRooms: Rooms[];
    informations_complementaires: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
