import { Parents } from '../parent/models/parent.model';
import { Roles } from '../role/models/role.model';
import { Nounus } from '../nounu/models/nounu.model';
import { SettingTypeProfil } from '../setting/models/setting_type_profil.model';
import { Notification } from '../notification/models/notification.model';
import { Job } from '../job/models/job.model';
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
    notifications: Notification[];
    jobs: Job[];
    role: Roles;
}
