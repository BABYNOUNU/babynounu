import { User } from 'src/app/user/user.model';
import { Preference } from 'src/app/Preference/models/preference.model';
import { Room } from 'src/app/rooms/models/room.model';
import { Contracts } from 'src/app/contracts/models/contracts.model';
export declare class Parents {
    id: number;
    fullname: string;
    adresse_mail: string;
    phone: string;
    number_of_children: string;
    budget_estimated: string;
    preferences: Preference[];
    user: User;
    parentRooms: Room[];
    contracts: Contracts[];
    informations_complementaires: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
