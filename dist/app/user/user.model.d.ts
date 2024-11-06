import { Parents } from '../parent/models/parent.model';
import { Roles } from '../role/models/role.model';
import { Nounus } from '../nounu/models/nounu.model';
export declare class User {
    id: string;
    slug: string;
    email: string;
    password: string;
    access_token: string;
    parent: Parents;
    nounu: Nounus;
    abonnement: Nounus;
    role: Roles;
}
