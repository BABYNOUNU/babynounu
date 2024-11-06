import { Medias } from 'src/app/media/models/media.model';
import { User } from 'src/app/user/user.model';
import { NounuSettings } from './nounu_setting.model';
export declare class Nounus {
    id: string;
    fullname: string;
    media: Medias[];
    old: string;
    phone: string;
    adresse: string;
    year_experience: string;
    hourly_rate: string;
    monthly_rate: string;
    pricing_flexibility: boolean;
    confirmed_verification: boolean;
    setting: NounuSettings[];
    user: User;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
