import { Parents } from '../parent/models/parent.model';
import { Roles } from '../role/models/role.model';
import { Nounus } from '../nounu/models/nounu.model';
import { SettingTypeProfil } from '../setting/models/setting_type_profil.model';
export declare class User {
    id: string;
    slug: string;
    email: string;
    password: string;
    access_token: string;
    type_profil: SettingTypeProfil;
    nounu: Nounus;
    parent: Parents;
    abonnement: Nounus;
    role: Roles;
}
