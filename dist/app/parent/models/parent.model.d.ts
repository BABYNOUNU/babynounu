import { Medias } from 'src/app/media/models/media.model';
import { User } from 'src/app/user/user.model';
import { ParentSettings } from './parent_setting.model';
export declare class Parents {
    id: string;
    fullname: string;
    media: Medias[];
    old: string;
    phone: string;
    adresse: string;
    setting: ParentSettings[];
    budget_min: string;
    budget_max: string;
    mode_de_paiement: string;
    user: User;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
