import { Preference } from 'src/app/Preference/models/preference.model';
import { TypeParameter } from './parameter_type.model';
import { User } from 'src/app/user/user.model';
import { Abonnements } from 'src/app/abonnement/models/abonnement.model';
import { Medias } from 'src/app/media/models/media.model';
export declare class Parameter {
    id: number;
    name: string;
    slug: string;
    description: string;
    priority: number;
    type_parameter: TypeParameter;
    type_profil: User[];
    role: User[];
    type_abonnements: Abonnements[];
    type_media: Medias;
    horaire_disponible: Preference;
    zone_de_travail: Preference;
    tranche_age_enfants: Preference;
    besions_specifiques: Preference;
    mode_de_paiement: Preference;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
