import { User } from 'src/app/user/user.model';
import { Preference } from 'src/app/Preference/models/preference.model';
export declare class Parents {
    id: string;
    fullname: string;
    adresse_mail: string;
    phone: string;
    number_of_children: string;
    budget_estimated: string;
    preferences: Preference[];
    user: User;
    informations_complementaires: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
